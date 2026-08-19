import crypto from "crypto";
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
// REGISTER USER
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
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      college: college || "",
      branch: branch || "",
      year: year || "",
      authProvider: "local",
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
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
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed.",
    });
  }
};

// ============================================================
// LOGIN USER
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
        await user.save();

    // Admin email
    if (user.email === "kunalvarshney187@gmail.com") {
      user.role = "admin";
      await user.save();
    }

    // Generate JWT
    const token = generateToken(user._id, sessionId);

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
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // IMPORTANT:
    // Your .env contains CLIENT_URL
    const clientUrl =
      process.env.CLIENT_URL || "http://localhost:5173";

    const resetUrl =
      `${clientUrl}/reset-password/${resetToken}`;

    console.log("RESET URL GENERATED");

    // Send email
    await transporter.sendMail({
      from: `"CampusHub AI" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "CampusHub AI - Reset Your Password",

      html:`
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


    console.log("RESET EMAIL SENT TO:", user.email);

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send reset email.",
    });
  }
};

// ============================================================
// RESET PASSWORD
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
        message: "Password must be at least 6 characters.",
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
        message: "Reset link is invalid or has expired.",
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
      message: "Password reset successful. You can now login.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
};

// ============================================================
// GOOGLE LOGIN SUCCESS
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
    console.error("Google Login Success Error:", error);

    return res.redirect(
      `${process.env.CLIENT_URL}/login?error=google-login-failed`
    );
  }
};