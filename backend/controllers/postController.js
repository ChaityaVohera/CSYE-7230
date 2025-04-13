// controllers/postController.js
const Post = require("../models/postModel");

/**
 * Create a new post.
 * @route POST /api/post/create
 * @access Protected
 * @param {Object} req - Express request object containing `title`, `text`, and `userId` in the body.
 * @param {Object} res - Express response object.
 * @returns {Object} - Success message and the created post object.
 */
const createPost = async (req, res) => {
  try {
    const { title, text, userId , domain} = req.body;

    // Validate data
    if (!title || !text || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create the post
    const newPost = new Post({
      title,
      text,
      userId,
      domain,
    });

    // Save the post to the database
    await newPost.save();

    // Respond with the created post
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
  }
};

/**
 * Get all posts across the user's network.
 * @route GET /api/post/network
 * @access Protected
 * @param {Object} req - Express request object (auth handled by frontend).
 * @param {Object} res - Express response object.
 * @returns {Object} - List of all posts (frontend will filter based on user session).
 */
const getNetworkPosts = async (req, res) => {
  try {
    // The frontend will verify authentication before making the request
    // Backend simply returns all posts
    const allPosts = await Post.find()
      .populate("authorId", "userName bio pic")
      .sort({ createdAt: -1 });

    console.log(allPosts);

    res.status(200).json({
      success: true,
      data: allPosts, // Let frontend filter based on session storage
    });
  } catch (error) {
    console.error("Feed error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load posts",
    });
  }
};

module.exports = { createPost, getNetworkPosts };
