/**
 * @file chatRoutes.js
 * @description Routes related to one-to-one and group chat management.
 * @module routes/chatRoutes
 */

const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/chat
 * @description Access or create a one-on-one chat.
 * @access Protected
 */
router.route("/").post(protect, accessChat);

/**
 * @route GET /api/chat
 * @description Fetch all chats for the authenticated user.
 * @access Protected
 */
router.route("/").get(protect, fetchChats);

/**
 * @route POST /api/chat/group
 * @description Create a new group chat.
 * @access Protected
 */
router.route("/group").post(protect, createGroupChat);

/**
 * @route PUT /api/chat/rename
 * @description Rename an existing group chat.
 * @access Protected
 */
router.route("/rename").put(protect, renameGroup);

/**
 * @route PUT /api/chat/groupremove
 * @description Remove a user from a group chat.
 * @access Protected
 */
router.route("/groupremove").put(protect, removeFromGroup);

/**
 * @route PUT /api/chat/groupadd
 * @description Add a user to a group chat.
 * @access Protected
 */
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
