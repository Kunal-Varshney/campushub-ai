
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ==========================
// Register User
// ==========================
export const registerUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      name,
      email,
      password,
      college,
      branch,
      year,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      college,
      branch,
      year,
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
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login User
// ==========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // IMPORTANT:
    // password has select:false in User model,
    // so explicitly include it during login.
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Check if account is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked by admin.",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // 👑 Admin email
    if (user.email === "kunalvarshney187@gmail.com") {
      user.role = "admin";

      // Save admin role
      await user.save();
    }

    const token = generateToken(user._id);

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
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
