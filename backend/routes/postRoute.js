/**
 * @file postRoute.js
 * @description Routes for post creation and retrieving the network feed.
 * @module routes/postRoute
 */

const express = require("express");
const router = express.Router();
const {
  createPost,
  getNetworkPosts,
} = require("../controllers/postController");

/**
 * @route POST /api/post/create
 * @description Create a new post by a user.
 * @access Protected
 */
router.post("/create", createPost);

/**
 * @route GET /api/post/getPosts
 * @description Retrieve all posts from the network feed.
 * @access Protected
 */
router.get("/getPosts", getNetworkPosts); // Single endpoint for feed

module.exports = router;
