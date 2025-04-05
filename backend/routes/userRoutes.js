/**
 * @file userRoutes.js
 * @description Routes for user registration, authentication, and search.
 * @module routes/userRoutes
 */

const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route GET /api/user
 * @description Get or search users by name or email.
 * @access Protected
 */
router.route("/").get(protect, allUsers);

/**
 * @route POST /api/user
 * @description Register a new user.
 * @access Public
 */
router.route("/").post(registerUser);

/**
 * @route POST /api/user/login
 * @description Authenticate a user with email and password.
 * @access Public
 */
router.post("/login", authUser);

module.exports = router;
