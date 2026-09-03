import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

import {
  isValidEmailFormat,
  isDisposableEmail,
} from "../utils/disposableEmailChecker.js";

import { createNotification } from "./notification.controller.js";

// ============================================================
// DEVELOPMENT AUTH MODE
// ============================================================
const DEVELOPMENT_AUTH_MODE = false;

const OTP_EXPIRY_MINUTES = 10;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
const SESSION_EXPIRY_DAYS = 7;
const RESET_TOKEN_EXPIRY_MINUTES = 15;
const ADMIN_EMAIL = "kunalvarshney187@gmail.com";

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

// ============================================================
// MAILJET EMAIL API
// Uses HTTPS instead of SMTP.
// ============================================================
const MAILJET_API_URL = "https://api.mailjet.com/v3.1/send";

const MAILJET_API_KEY = process.env.MJ_APIKEY_PUBLIC;
const MAILJET_SECRET_KEY = process.env.MJ_APIKEY_PRIVATE;

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_FROM_NAME =
  process.env.EMAIL_FROM_NAME || "CampusHub AI";

// ============================================================
// SEND EMAIL THROUGH MAILJET
// ============================================================
async function sendEmail({ to, subject, html, text }) {
  if (!MAILJET_API_KEY || !MAILJET_SECRET_KEY || !EMAIL_FROM) {
    throw new Error(
      "MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE or EMAIL_FROM is missing."
    );
  }

  const credentials = Buffer.from(
    `${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`
  ).toString("base64");

  const response = await fetch(MAILJET_API_URL, {
    method: "POST",

    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: EMAIL_FROM,
            Name: EMAIL_FROM_NAME,
          },

          To: [
            {
              Email: to,
            },
          ],

          Subject: subject,

          TextPart: text || "",

          HTMLPart: html,
        },
      ],
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error(
      "MAILJET API ERROR:",
      data || response.statusText
    );

    throw new Error(
      data?.ErrorMessage ||
        data?.ErrorInfo ||
        `Mailjet email failed with status ${response.status}.`
    );
  }

  return data;
}

// ============================================================
// HELPERS
// ============================================================

function normalizeEmail(email) {
  return typeof email === "string"
    ? email.trim().toLowerCase()
    : email;
}

function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

function isValidOtpFormat(otp) {
  return typeof otp === "string" && /^\d{6}$/.test(otp);
}

function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    college: user.college,
    branch: user.branch,
    year: user.year,
    role: user.role,
    avatar: user.avatar,
  };
}

async function startSession(user) {
  const sessionId = crypto.randomUUID();

  user.activeSessionId = sessionId;

  user.activeSessionExpires = new Date(
    Date.now() +
      SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  );

  await user.save();

  return generateToken(user._id, sessionId);
}

function applyAdminRoleIfMatch(user) {
  if (user.email === ADMIN_EMAIL) {
    user.role = "admin";
  }
}

// ============================================================
// 1. REGISTER
// ============================================================

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      password,
      college,
      branch,
      year,
    } = req.body;

    const email = normalizeEmail(req.body.email);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long.",
      });
    }

    if (!isValidEmailFormat(email)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    // ========================================================
    // DISPOSABLE EMAIL PROTECTION
    // ========================================================

    const disposableCheck =
      isDisposableEmail(email);

    if (disposableCheck.isDisposable) {
      console.warn(
        `Disposable email blocked: domain=${disposableCheck.domain}`
      );

      return res.status(400).json({
        success: false,
        message:
          "Temporary or disposable email addresses are not allowed. Please use a permanent email address.",
      });
    }

    // ========================================================
    // CHECK EXISTING USER
    // ========================================================

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      if (
        existingUser.authProvider === "local" &&
        !existingUser.isEmailVerified
      ) {
        const otp = generateOtp();

        existingUser.name = name;
        existingUser.password = password;
        existingUser.college = college;
        existingUser.branch = branch;
        existingUser.year = year;

        existingUser.emailVerificationOtp = otp;

        existingUser.emailVerificationOtpExpire =
          new Date(
            Date.now() +
              OTP_EXPIRY_MINUTES * 60 * 1000
          );

        existingUser.emailVerificationLastSent =
          new Date();

        await existingUser.save();

        return res.status(409).json({
          success: false,

          message:
            "Account exists but is not verified. A new verification code has been generated.",

          requiresVerification: true,

          email,

          ...(DEVELOPMENT_AUTH_MODE
            ? {
                developmentOtp: otp,
              }
            : {}),
        });
      }

      return res.status(400).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    // ========================================================
    // GENERATE OTP
    // ========================================================

    const otp = generateOtp();

    const newUser = new User({
      name,
      email,
      password,
      college,
      branch,
      year,

      authProvider: "local",

      isEmailVerified: false,

      emailVerificationOtp: otp,

      emailVerificationOtpExpire:
        new Date(
          Date.now() +
            OTP_EXPIRY_MINUTES * 60 * 1000
        ),

      emailVerificationLastSent: new Date(),
    });

    applyAdminRoleIfMatch(newUser);

    await newUser.save();

    // ========================================================
    // SEND VERIFICATION EMAIL
    // ========================================================

    try {
      await sendEmail({
        to: email,

        subject:
          "CampusHub AI - Email Verification OTP",

        text:
          `Your CampusHub AI verification code is ${otp}. ` +
          `It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              max-width:600px;
              margin:auto;
            "
          >

            <h2>
              Verify your CampusHub AI account
            </h2>

            <p>
              Your email verification code is:
            </p>

            <div
              style="
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                padding:20px;
                background:#f4f7fb;
                text-align:center;
                border-radius:10px;
              "
            >
              ${otp}
            </div>

            <p>
              This OTP will expire in
              ${OTP_EXPIRY_MINUTES} minutes.
            </p>

            <p>
              If you did not create this account,
              you can ignore this email.
            </p>

            <p>
              — CampusHub AI
            </p>

          </div>
        `,
      });
    } catch (emailError) {
      await User.deleteOne({
        _id: newUser._id,
      });

      throw emailError;
    }

    // ============================================================
    // ADMIN NEW USER NOTIFICATION
    // ============================================================

    try {
      const adminUser = await User.findOne({
        email: ADMIN_EMAIL.toLowerCase(),
        role: "admin",
      }).select("_id");

      if (adminUser?._id) {
        await createNotification({
          user: adminUser._id,
          title: "New User Signup",
          message: `${newUser.name} (${newUser.email}) has created a new CampusHub AI account.`,
          type: "system",
          link: "/admin/users",
        });
      } else {
        console.warn(
          "ADMIN SIGNUP NOTIFICATION: Admin user not found."
        );
      }
    } catch (notificationError) {
      console.error(
        "ADMIN SIGNUP NOTIFICATION ERROR:",
        notificationError.message
      );
    }

    // ============================================================
    // ADMIN EMAIL NOTIFICATION
    // ============================================================

    try {
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: "CampusHub AI — New User Signup",
        text: `
    A new user has signed up on CampusHub AI.

    Name: ${newUser.name}
    Email: ${newUser.email}
    Signup Time: ${newUser.createdAt?.toISOString() || new Date().toISOString()}

    The user still needs to complete email verification.
        `.trim(),

        html: `
          <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:32px;">
            <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; padding:32px; border:1px solid #e2e8f0;">
              
              <h2 style="margin:0 0 8px; color:#0f172a;">
                New User Signup
              </h2>

              <p style="margin:0 0 24px; color:#64748b;">
                A new user has created an account on CampusHub AI.
              </p>

              <div style="background:#f8fafc; border-radius:12px; padding:20px;">
                
                <p style="margin:0 0 12px; color:#334155;">
                  <strong>Name:</strong>
                  ${newUser.name}
                </p>

                <p style="margin:0 0 12px; color:#334155;">
                  <strong>Email:</strong>
                  ${newUser.email}
                </p>

                <p style="margin:0; color:#334155;">
                  <strong>Signup Time:</strong>
                  ${
                    newUser.createdAt?.toISOString() ||
                    new Date().toISOString()
                  }
                </p>

              </div>

              <p style="margin:24px 0 0; color:#64748b; font-size:14px;">
                The user still needs to complete email verification.
              </p>

              <p style="margin:24px 0 0; color:#94a3b8; font-size:12px;">
                CampusHub AI Administration
              </p>

            </div>
          </div>
        `,
      });

      console.log(
        `ADMIN SIGNUP EMAIL SENT ✅ → ${ADMIN_EMAIL}`
      );
    } catch (adminEmailError) {
      // IMPORTANT:
      // Admin notification email failure must NEVER
      // break the user's registration.
      console.error(
        "ADMIN SIGNUP EMAIL ERROR:",
        adminEmailError.message
      );
    }

    // ========================================================
    // SUCCESS
    // ========================================================

    return res.status(201).json({
      success: true,

      message:
        "Registration successful. Please verify your email.",

      requiresVerification: true,

      email,

      ...(DEVELOPMENT_AUTH_MODE
        ? {
            developmentOtp: otp,
          }
        : {}),
    });
  } catch (error) {
    console.error(
      "REGISTER FULL ERROR:",
      error
    );

    console.error(
      "REGISTER ERROR MESSAGE:",
      error.message
    );

    console.error(
      "REGISTER ERROR CODE:",
      error.code
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// 2. VERIFY EMAIL
// ============================================================

export const verifyEmail = async (req, res) => {
  try {
    const email = normalizeEmail(
      req.body.email
    );

    const { otp } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required.",
      });
    }

    if (!isValidOtpFormat(otp)) {
      return res.status(400).json({
        success: false,
        message:
          "OTP must be a 6-digit code.",
      });
    }

    const user = await User.findOne({
      email,
      authProvider: "local",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isEmailVerified) {
      const token =
        await startSession(user);

      return res.status(200).json({
        success: true,

        message:
          "Email already verified.",

        token,

        user: sanitizeUser(user),
      });
    }

    if (
      !user.emailVerificationOtpExpire ||
      user.emailVerificationOtpExpire <
        new Date()
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Verification code has expired. Please request a new one.",

        expired: true,
      });
    }

    if (
      user.emailVerificationOtp !== otp
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid verification code.",
      });
    }

    user.isEmailVerified = true;

    user.emailVerificationOtp = null;

    user.emailVerificationOtpExpire =
      null;

    user.emailVerificationLastSent = null;

    applyAdminRoleIfMatch(user);

    const token =
      await startSession(user);

    return res.status(200).json({
      success: true,

      message:
        "Email verified successfully.",

      token,

      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error(
      "verifyEmail error:",
      error.message
    );

    return res.status(500).json({
      success: false,

      message:
        "Something went wrong during verification.",
    });
  }
};

// ============================================================
// 3. RESEND OTP
// ============================================================

export const resendVerificationOtp =
  async (req, res) => {
    try {
      const email = normalizeEmail(
        req.body.email
      );

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email is required.",
        });
      }

      const user = await User.findOne({
        email,
        authProvider: "local",
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found.",
        });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,

          message:
            "This account is already verified.",
        });
      }

      if (user.emailVerificationLastSent) {
        const secondsSinceLastSent =
          (Date.now() -
            new Date(
              user.emailVerificationLastSent
            ).getTime()) /
          1000;

        if (
          secondsSinceLastSent <
          OTP_RESEND_COOLDOWN_SECONDS
        ) {
          const retryAfter =
            Math.ceil(
              OTP_RESEND_COOLDOWN_SECONDS -
                secondsSinceLastSent
            );

          return res.status(429).json({
            success: false,

            message:
              `Please wait ${retryAfter} seconds before requesting another OTP.`,

            retryAfter,
          });
        }
      }

      const otp = generateOtp();

      // ======================================================
      // SEND FIRST
      // ======================================================

      await sendEmail({
        to: email,

        subject:
          "CampusHub AI - New Verification OTP",

        text:
          `Your new CampusHub AI verification code is ${otp}. ` +
          `It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,

        html: `
          <div
            style="
              font-family:Arial,sans-serif;
              max-width:600px;
              margin:auto;
            "
          >

            <h2>
              Verify your CampusHub AI account
            </h2>

            <p>
              Your new verification code is:
            </p>

            <div
              style="
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                padding:20px;
                background:#f4f7fb;
                text-align:center;
                border-radius:10px;
              "
            >
              ${otp}
            </div>

            <p>
              This OTP will expire in
              ${OTP_EXPIRY_MINUTES} minutes.
            </p>

            <p>
              — CampusHub AI
            </p>

          </div>
        `,
      });

      // ======================================================
      // SAVE OTP ONLY AFTER MAILJET ACCEPTS EMAIL
      // ======================================================

      user.emailVerificationOtp = otp;

      user.emailVerificationOtpExpire =
        new Date(
          Date.now() +
            OTP_EXPIRY_MINUTES * 60 * 1000
        );

      user.emailVerificationLastSent =
        new Date();

      await user.save();

      return res.status(200).json({
        success: true,

        message:
          "A new verification code has been generated.",

        ...(DEVELOPMENT_AUTH_MODE
          ? {
              developmentOtp: otp,
            }
          : {}),
      });
    } catch (error) {
      console.error(
        "resendVerificationOtp error:",
        error.message
      );

      return res.status(500).json({
        success: false,

        message:
          "Something went wrong while resending the OTP.",
      });
    }
  };

// ============================================================
// 4. LOGIN
// ============================================================

export const loginUser = async (
  req,
  res
) => {
  try {
    const email = normalizeEmail(
      req.body.email
    );

    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,

        message:
          "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    console.log("LOGIN DEBUG:", {
    found: !!user,
    email: user?.email,
    hasPassword: !!user?.password,
    passwordLength: user?.password?.length,
    verified: user?.isEmailVerified,
    authProvider: user?.authProvider,
  });

    if (!user) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid email or password.",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,

        message:
          "This account has been blocked. Please contact support.",
      });
    }

    if (
      !user.password &&
      user.authProvider === "google"
    ) {
      return res.status(400).json({
        success: false,

        message:
          "This account uses Google login. Please sign in with Google.",
      });
    }

    if (
      user.authProvider === "local" &&
      !user.isEmailVerified
    ) {
      return res.status(403).json({
        success: false,

        message:
          "Please verify your email before logging in.",

        requiresVerification: true,

        email,
      });
    }

    const isMatch =
      await user.comparePassword(password);

      console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid email or password.",
      });
    }

    applyAdminRoleIfMatch(user);

    const token =
      await startSession(user);

    return res.status(200).json({
      success: true,

      message:
        "Login successful.",

      token,

      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error(
      "loginUser error:",
      error.message
    );

    return res.status(500).json({
      success: false,

      message:
        "Something went wrong during login.",
    });
  }
};

// ============================================================
// 5. FORGOT PASSWORD
// ============================================================

export const forgotPassword =
  async (req, res) => {
    try {
      const email = normalizeEmail(
        req.body.email
      );

      if (!email) {
        return res.status(400).json({
          success: false,

          message:
            "Email is required.",
        });
      }

      const genericResponse = {
        success: true,

        message:
          "If an account with that email exists, a password reset link has been generated.",
      };

      const user = await User.findOne({
        email,
      }).select("+password");

      if (
        !user ||
        user.authProvider !== "local"
      ) {
        return res.status(200).json(
          genericResponse
        );
      }

      const resetToken =
        crypto.randomBytes(32).toString(
          "hex"
        );

      user.resetPasswordToken =
        hashToken(resetToken);

      user.resetPasswordExpire =
        new Date(
          Date.now() +
            RESET_TOKEN_EXPIRY_MINUTES *
              60 *
              1000
        );

      await user.save();

      const resetUrl =
        `${CLIENT_URL}/reset-password/${resetToken}`;

      // NOTE:
      // Current implementation preserves
      // existing behavior and does not email
      // the reset URL.

      return res.status(200).json({
        success: true,

        message:
          "Password reset link generated successfully.",

        ...(DEVELOPMENT_AUTH_MODE
          ? {
              developmentResetUrl:
                resetUrl,
            }
          : {}),
      });
    } catch (error) {
      console.error(
        "forgotPassword error:",
        error.message
      );

      return res.status(500).json({
        success: false,

        message:
          "Something went wrong while processing your request.",
      });
    }
  };

// ============================================================
// 6. RESET PASSWORD
// ============================================================

export const resetPassword =
  async (req, res) => {
    try {
      const { token } = req.params;

      const { password } = req.body;

      if (
        !password ||
        password.length < 6
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Password must be at least 6 characters long.",
        });
      }

      const hashedToken =
        hashToken(token);

      const user = await User.findOne({
        resetPasswordToken:
          hashedToken,

        resetPasswordExpire: {
          $gt: new Date(),
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,

          message:
            "Password reset link is invalid or has expired.",
        });
      }

      user.password = password;

      user.authProvider = "local";

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      user.activeSessionId =
        undefined;

      user.activeSessionExpires =
        undefined;

      await user.save();

      return res.status(200).json({
        success: true,

        message:
          "Password reset successful. You can now login.",
      });
    } catch (error) {
      console.error(
        "resetPassword error:",
        error.message
      );

      return res.status(500).json({
        success: false,

        message:
          "Something went wrong while resetting your password.",
      });
    }
  };

// ============================================================
// 7. GOOGLE LOGIN SUCCESS
// ============================================================

export const googleLoginSuccess =
  async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.redirect(
          `${CLIENT_URL}/login?error=google_login_failed`
        );
      }

      if (user.isBlocked) {
        return res.redirect(
          `${CLIENT_URL}/login?error=account_blocked`
        );
      }

      user.isEmailVerified = true;

      applyAdminRoleIfMatch(user);

      const token =
        await startSession(user);

      const params =
        new URLSearchParams({
          token,

          id: user._id.toString(),

          name: user.name || "",

          email: user.email || "",

          college: user.college || "",

          branch: user.branch || "",

          year: user.year || "",

          role: user.role || "",

          avatar: user.avatar || "",
        });

      return res.redirect(
        `${CLIENT_URL}/auth/google/success?${params.toString()}`
      );
    } catch (error) {
      console.error(
        "googleLoginSuccess error:",
        error.message
      );

      return res.redirect(
        `${CLIENT_URL}/login?error=google_login_failed`
      );
    }
  };

// ============================================================
// 8. LOGOUT
// ============================================================

export const logoutUser =
  async (req, res) => {
    try {
      const authHeader =
        req.headers.authorization;

      const token =
        authHeader &&
        authHeader.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : null;

      if (token) {
        try {
          const decoded =
            jwt.verify(
              token,
              process.env.JWT_SECRET,
              {
                ignoreExpiration: true,
              }
            );

          if (
            decoded &&
            decoded.id
          ) {
            await User.findByIdAndUpdate(
              decoded.id,
              {
                $unset: {
                  activeSessionId: "",
                  activeSessionExpires: "",
                },
              }
            );
          }
        } catch (verifyError) {
          console.error(
            "logoutUser token verify error:",
            verifyError.message
          );
        }
      }

      return res.status(200).json({
        success: true,

        message:
          "Logged out successfully.",
      });
    } catch (error) {
      console.error(
        "logoutUser error:",
        error.message
      );

      return res.status(200).json({
        success: true,

        message:
          "Logged out successfully.",
      });
    }
  };