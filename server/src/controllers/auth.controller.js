import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ============================================================
// EMAIL TRANSPORTER
// ============================================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ============================================================
// EMAIL VERIFICATION CONSTANTS
// ============================================================

const OTP_EXPIRY_MINUTES = 10;
const OTP_RESEND_COOLDOWN_SECONDS = 60;

// ============================================================
// GENERATE 6 DIGIT OTP
// ============================================================

const generateVerificationOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// ============================================================
// SEND VERIFICATION OTP EMAIL
// ============================================================

const sendVerificationEmail = async (email, name, otp) => {
  await transporter.sendMail({
    from: `"CampusHub AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "CampusHub AI - Verify Your Email",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 30px auto;
        padding: 30px;
        background: #0f172a;
        color: #ffffff;
        border-radius: 16px;
      ">

        <h2 style="
          color: #38bdf8;
          margin-bottom: 20px;
        ">
          CampusHub AI
        </h2>

        <h3>
          Verify Your Email
        </h3>

        <p style="
          color: #cbd5e1;
          line-height: 1.6;
        ">
          Hello ${name || "there"},
        </p>

        <p style="
          color: #cbd5e1;
          line-height: 1.6;
        ">
          Thank you for creating an account with CampusHub AI.
          Use the verification code below to verify your email address.
        </p>

        <div style="
          margin: 30px 0;
          text-align: center;
        ">

          <div style="
            display: inline-block;
            padding: 16px 28px;
            background: #1e293b;
            color: #38bdf8;
            border: 1px solid #334155;
            border-radius: 12px;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
          ">
            ${otp}
          </div>

        </div>

        <p style="
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
        ">
          This verification code will expire in
          ${OTP_EXPIRY_MINUTES} minutes.
        </p>

        <p style="
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
        ">
          If you did not create this account, you can safely ignore
          this email.
        </p>

      </div>
    `,
  });
};

// ============================================================
// REGISTER USER
// POST /api/auth/register
// ============================================================

export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const {
      name,
      email,
      password,
      college,
      branch,
      year,
    } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      // Existing unverified account:
      // allow user to request a fresh OTP instead of creating duplicate user.
      if (
        existingUser.authProvider === "local" &&
        existingUser.isEmailVerified === false
      ) {
        return res.status(409).json({
          success: false,
          message:
            "An unverified account already exists with this email. Please verify your email or request a new OTP.",
          requiresVerification: true,
          email: existingUser.email,
        });
      }

      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // ========================================================
    // CREATE USER
    // ========================================================

    const verificationOtp = generateVerificationOtp();

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      college: college || "",
      branch: branch || "",
      year: year || "",
      authProvider: "local",

      // Email verification
      isEmailVerified: false,
      emailVerificationOtp: verificationOtp,
      emailVerificationOtpExpire: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ),
      emailVerificationLastSent: new Date(),
    });

    // ========================================================
    // ADMIN EMAIL
    // ========================================================

    if (user.email === "kunalvarshney187@gmail.com") {
      user.role = "admin";
      await user.save();
    }

    // ========================================================
    // SEND VERIFICATION EMAIL
    // ========================================================

    try {
      await sendVerificationEmail(
        user.email,
        user.name,
        verificationOtp
      );
    } catch (emailError) {
      console.error(
        "Verification Email Error:",
        emailError.message
      );

      // Remove newly created account if email could not be sent.
      await User.findByIdAndDelete(user._id);

      return res.status(500).json({
        success: false,
        message:
          "Unable to send verification email. Please try again later.",
      });
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    // IMPORTANT:
    // Do NOT create JWT/session before email verification.

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email.",
      requiresVerification: true,
      email: user.email,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

// ============================================================
// VERIFY EMAIL
// POST /api/auth/verify-email
// ============================================================

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedOtp = String(otp).trim();

    if (!/^\d{6}$/.test(normalizedOtp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit verification code.",
      });
    }

    // ========================================================
    // FIND USER
    // ========================================================

    const user = await User.findOne({
      email: normalizedEmail,
      authProvider: "local",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    // ========================================================
    // ALREADY VERIFIED
    // ========================================================

    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: "Email is already verified.",
      });
    }

    // ========================================================
    // OTP EXPIRY CHECK
    // ========================================================

    if (
      !user.emailVerificationOtpExpire ||
      user.emailVerificationOtpExpire <= new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This verification code has expired. Please request a new OTP.",
        expired: true,
      });
    }

    // ========================================================
    // OTP CHECK
    // ========================================================

    if (user.emailVerificationOtp !== normalizedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code. Please try again.",
      });
    }

    // ========================================================
    // VERIFY EMAIL
    // ========================================================

    user.isEmailVerified = true;
    user.emailVerificationOtp = null;
    user.emailVerificationOtpExpire = null;
    user.emailVerificationLastSent = null;

    // ========================================================
    // CREATE ACTIVE LOGIN SESSION
    // ========================================================

    const sessionId = crypto.randomUUID();

    user.activeSessionId = sessionId;

    // Session validity: 7 days
    user.activeSessionExpires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    // Admin email
    if (user.email === "kunalvarshney187@gmail.com") {
      user.role = "admin";
    }

    await user.save();

    // ========================================================
    // GENERATE JWT
    // ========================================================

    const token = generateToken(
      user._id,
      sessionId
    );

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        year: user.year,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify email.",
    });
  }
};

// ============================================================
// RESEND VERIFICATION OTP
// POST /api/auth/resend-otp
// ============================================================

export const resendVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
      authProvider: "local",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    // ========================================================
    // ALREADY VERIFIED
    // ========================================================

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "This email is already verified.",
      });
    }

    // ========================================================
    // RESEND COOLDOWN
    // ========================================================

    if (user.emailVerificationLastSent) {
      const elapsedSeconds =
        (Date.now() -
          user.emailVerificationLastSent.getTime()) /
        1000;

      if (elapsedSeconds < OTP_RESEND_COOLDOWN_SECONDS) {
        const remainingSeconds = Math.ceil(
          OTP_RESEND_COOLDOWN_SECONDS - elapsedSeconds
        );

        return res.status(429).json({
          success: false,
          message: `Please wait ${remainingSeconds} seconds before requesting another OTP.`,
          retryAfter: remainingSeconds,
        });
      }
    }

    // ========================================================
    // GENERATE NEW OTP
    // ========================================================

    const newOtp = generateVerificationOtp();

    user.emailVerificationOtp = newOtp;

    user.emailVerificationOtpExpire = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );

    user.emailVerificationLastSent = new Date();

    await user.save();

    // ========================================================
    // SEND NEW OTP
    // ========================================================

    try {
      await sendVerificationEmail(
        user.email,
        user.name,
        newOtp
      );
    } catch (emailError) {
      console.error(
        "Resend Verification Email Error:",
        emailError.message
      );

      // Do not leave a newly generated OTP active if sending failed.
      user.emailVerificationOtp = null;
      user.emailVerificationOtpExpire = null;
      user.emailVerificationLastSent = null;

      await user.save();

      return res.status(500).json({
        success: false,
        message:
          "Unable to send verification email. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "A new verification code has been sent.",
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to resend verification code.",
    });
  }
};

// ============================================================
// LOGIN USER
// POST /api/auth/login
// ============================================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    console.log("LOGIN EMAIL:", normalizedEmail);

    // Find user and include password
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    console.log("USER FOUND:", !!user);

    // User does not exist
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Check blocked account
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked by admin.",
      });
    }

    // Google-only account
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account uses Google Login. Please continue with Google.",
      });
    }

    // ========================================================
    // EMAIL VERIFICATION CHECK
    // ========================================================

    if (user.isEmailVerified === false) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before logging in.",
        requiresVerification: true,
        email: user.email,
      });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // ========================================================
    // CHECK ACTIVE LOGIN SESSION
    // ========================================================

    const now = new Date();

    if (
      user.activeSessionId &&
      user.activeSessionExpires &&
      user.activeSessionExpires > now
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This account is already logged in on another device. Please log out from that device before logging in here.",
      });
    }

    // ========================================================
    // CREATE NEW LOGIN SESSION
    // ========================================================

    const sessionId = crypto.randomUUID();

    user.activeSessionId = sessionId;

    // Session validity: 7 days
    user.activeSessionExpires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    // Admin email
    if (user.email === "kunalvarshney187@gmail.com") {
      user.role = "admin";
    }

    await user.save();

    // ========================================================
    // GENERATE JWT
    // ========================================================

    const token = generateToken(
      user._id,
      sessionId
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        year: user.year,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Login failed.",
    });
  }
};

// ============================================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ============================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter your email.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
      email: normalizedEmail,
    });

    // Do not reveal whether email exists
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

    // Generate raw reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash reset token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;

    // Token expires in 15 minutes
    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    const clientUrl =
      process.env.CLIENT_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    console.log("RESET URL GENERATED");

    // Send email
    await transporter.sendMail({
      from: `"CampusHub AI" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "CampusHub AI - Reset Your Password",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 30px auto;
          padding: 30px;
          background: #0f172a;
          color: #ffffff;
          border-radius: 16px;
        ">

          <h2 style="
            color: #38bdf8;
            margin-bottom: 20px;
          ">
            CampusHub AI
          </h2>

          <h3>
            Password Reset Request
          </h3>

          <p style="
            color: #cbd5e1;
            line-height: 1.6;
          ">
            We received a request to reset your CampusHub AI password.
          </p>

          <p style="
            color: #cbd5e1;
            line-height: 1.6;
          ">
            Click the button below to create a new password.
          </p>

          <div style="
            margin: 30px 0;
          ">

            <a
              href="${resetUrl}"
              style="
                display: inline-block;
                padding: 14px 24px;
                background: #2563eb;
                color: #ffffff;
                text-decoration: none;
                border-radius: 10px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>

          </div>

          <p style="
            color: #94a3b8;
            font-size: 14px;
          ">
            This link will expire in 15 minutes.
          </p>

          <p style="
            color: #94a3b8;
            font-size: 14px;
          ">
            If you did not request this password reset,
            you can safely ignore this email.
          </p>

        </div>
      `,
    });

    console.log(
      "RESET EMAIL SENT TO:",
      user.email
    );

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to send reset email.",
    });
  }
};

// ============================================================
// RESET PASSWORD
// POST /api/auth/reset-password/:token
// ============================================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate password
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters.",
      });
    }

    // Hash token received from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find valid reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Reset link is invalid or has expired.",
      });
    }

    // Hash new password
    user.password = password;

    // Change authentication provider to local
    user.authProvider = "local";

    // Remove reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
};

// ============================================================
// GOOGLE LOGIN SUCCESS
// GET /api/auth/google/callback
// ============================================================

export const googleLoginSuccess = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/login?error=google-login-failed`
      );
    }

    // Check blocked account
    if (req.user.isBlocked) {
      return res.redirect(
        `${process.env.CLIENT_URL}/login?error=account-blocked`
      );
    }

    // ========================================================
    // GOOGLE ALREADY VERIFIES EMAIL OWNERSHIP
    // ========================================================

    if (req.user.isEmailVerified !== true) {
      req.user.isEmailVerified = true;
      await req.user.save();
    }

    // Generate JWT
    const token = generateToken(req.user._id);

    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      college: req.user.college,
      branch: req.user.branch,
      year: req.user.year,
      role: req.user.role,
      avatar: req.user.avatar,
    };

    const encodedUser = encodeURIComponent(
      JSON.stringify(userData)
    );

    return res.redirect(
      `${process.env.CLIENT_URL}/auth/google/success?token=${encodeURIComponent(
        token
      )}&user=${encodedUser}`
    );
  } catch (error) {
    console.error(
      "Google Login Success Error:",
      error
    );

    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=google-login-failed`
    );
  }
};

// ============================================================
// LOGOUT USER
// POST /api/auth/logout
// ============================================================

export const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET,
          {
            ignoreExpiration: true,
          }
        );

        await User.findByIdAndUpdate(
          decoded.id,
          {
            $set: {
              activeSessionId: null,
              activeSessionExpires: null,
            },
          }
        );
      } catch (tokenError) {
        console.error(
          "Logout token error:",
          tokenError.message
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    console.error(
      "Logout Error:",
      error
    );

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  }
};