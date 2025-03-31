const express = require('express');
const router = express.Router();
const { createPost, getNetworkPosts } = require('../controllers/postController');

router.post('/create', createPost);
router.get('/getPosts', getNetworkPosts); // Single endpoint for feed

module.exports = router;