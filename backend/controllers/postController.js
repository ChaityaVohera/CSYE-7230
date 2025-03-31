// controllers/postController.js
const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    const { title, text, userId } = req.body;

    // Validate data
    if (!title || !text || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create the post
    const newPost = new Post({
      title,
      text,
      userId,
    });

    // Save the post to the database
    await newPost.save();

    // Respond with the created post
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'An error occurred while creating the post.' });
  }
};

const getNetworkPosts = async (req, res) => {
  try {
    // The frontend will verify authentication before making the request
    // Backend simply returns all posts
    const allPosts = await Post.find()
      .populate('authorId', 'userName bio pic')
      .sort({ createdAt: -1 });
    console.log(allPosts)
    res.status(200).json({
      success: true,
      data: allPosts // Let frontend filter based on session storage
    });
  } catch (error) {
    console.error('Feed error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to load posts'
    });
  }
};


module.exports = { createPost, getNetworkPosts};
