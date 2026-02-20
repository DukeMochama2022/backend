import User from "../models/User.js";
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const loggedInUser = req.user;

    if (
      loggedInUser.role !== "admin" &&
      loggedInUser._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied: you can only view your own profile",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};




export { getProfile };
