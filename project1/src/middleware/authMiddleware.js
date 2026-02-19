import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("Not authorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id); //attach user to the request
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
    }
    next()
  };
};

export default protect;
