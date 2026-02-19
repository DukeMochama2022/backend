import Post from "../models/Post.js";

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, message: "Provide all information!" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Post created successifully", post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating post" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params.id;

    const post = await Post.findOne(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    //if user not ADMIN or AUTHOR block!!!
    if (
      req.user.role !== "admin" &&
      post.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    await post.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Post deleted successifully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating post" });
  }
};

export { createPost, getPosts, deletePost };
