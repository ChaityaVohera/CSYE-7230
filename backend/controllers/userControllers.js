const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
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

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
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

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password ,connected} = req.body;

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
//     NAVEEN

// const createUser = async (req, res) => {
//   const {
//     fullName,
//     email,
//     password,
//     userName,
//     bio,
//     gender,
//     interest,
//     interested,
//     connected,
//   } = req.body;

//   try {
//     const newUser = await User.create({
//       fullName,
//       email,
//       password,
//       userName,
//       bio,
//       gender,
//       interest,
//       interested,
//       connected,
//     });

//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     res.status(400).json({ error: 'User cannot be created.' });
//   }
// };


const getUserDomains = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the user and select only the 'interest' field
    const user = await User.findById(userId).select("interest");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send response with the 'interest' array, even if it's empty
    res.status(200).json({
      success: true,
      interest: user.interest || [], // This should be 'interest', not 'domains'
    });
  } catch (error) {
    console.error("User Domains Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user domains",
    });
  }
};


module.exports = { allUsers, registerUser, authUser, getUserDomains};

