/**
 * @file messageRoutes.js
 * @description Routes for sending and retrieving messages in a chat.
 * @module routes/messageRoutes
 */

const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route GET /api/message/:chatId
 * @description Fetch all messages in a specific chat.
 * @access Protected
 */
router.route("/:chatId").get(protect, allMessages);

/**
 * @route POST /api/message
 * @description Send a new message in a chat.
 * @access Protected
 */
router.route("/").post(protect, sendMessage);

module.exports = router;
