import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required!" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "The user already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //create a user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    //compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged in",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      expires: new Date(0),
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { register, login, logout };
