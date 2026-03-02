import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email }).session(session);
    if (exists) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    const token = generateToken(newUser[0]._id);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser[0]._id,
        name: newUser[0].name,
        email: newUser[0].email,
      },

      message: "user created successifully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Login successiful",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {};

export { signUp, signIn, logout };
