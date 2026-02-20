import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting users" });
  }
};

//promote a user to admin
const promoteToAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //prevent to repromote an admin
    if (user.role === "admin") {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    user.role = "admin";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User promoted to admin successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error promoting user" });
  }
};

export { getAllUsers, promoteToAdmin };
