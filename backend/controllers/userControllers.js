const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

/**
 * Search for users by name or email.
 * Excludes the currently logged-in user from the results.
 * @route GET /api/user?search=
 * @access Public
 * @param {Object} req - Express request object with `search` query param.
 * @param {Object} res - Express response object.
 * @returns {Array} - List of matching user documents.
 */
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

/**
 * Register a new user.
 * @route POST /api/user/
 * @access Public
 * @param {Object} req - Express request object containing `name`, `email`, `password`, and optionally `pic`.
 * @param {Object} res - Express response object.
 * @returns {Object} - Registered user info with JWT token.
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

/**
 * Authenticate a user with email and password.
 * @route POST /api/users/login
 * @access Public
 * @param {Object} req - Express request object containing `email` and `password`.
 * @param {Object} res - Express response object.
 * @returns {Object} - Authenticated user info with JWT token.
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password, connected } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      connected: user.connected,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
