require('dotenv').config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const postRoutes = require("./routes/postRoute")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const User = require("./models/userModel");
const Post = require("./models/postModel");
const cors = require("cors")

console.log(process.env.MONGO_URI);

connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(cors())

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/posts", postRoutes);
app.use("/user", userRoutes)

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}



// // Endpoint 1: User Creation
// app.post("/user/create", async (req, res) => {

//   const { fullName, email, password, userName, bio, gender, interest, interested, connected } = req.body;

//   try {
//     // Validate email
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email address" });
//     }

//     // Validate full name
//     if (!fullName || fullName.length < 3) {
//       return res
//         .status(400)
//         .json({ error: "Full name must be at least 3 characters long" });
//     }

//     // Validate password
//     if (!password || password.length < 8) {
//       return res
//         .status(400)
//         .json({ error: "Password must be at least 8 characters long" });
//     }

//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(206).json({ error: "Email already in use" });
//     }

//     // Hash the password with bcrypt
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     // Store user data in MongoDB
//     const newUser = {
//       // _id: new ObjectId(),
//       fullName,
//       email,
//       password: hashedPassword,
//       userName,
//       bio,
//       gender,
//       interest:[],
//       interested:[],
//       connected:[],
      
//     };

//     await User.insertOne(newUser);

//     return res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     return res.status(400).json({error : "User cannot be created."})
//   }
// });

// Endpoint 2: Update User Details from dashboard
app.put("/user/edit/:userID", async (req, res) => {
  const {  fullName,userName,bio,gender  } = req.body;
  const userID = req.params.userID;
  // Update user details in MongoDB
  const result = await User.updateOne(
    { "_id" : userID },
    {
      $set: {
        userName,
        fullName,
        bio,
        gender,
      },
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User details updated successfully" });
});

//Endpoint 3: update interest
app.put("/user/interest/:userID", async (req, res) => {
  const {  interest  } = req.body;
  const userID = req.params.userID;
  // Update user details in MongoDB
  const result = await User.updateOne(
    { "_id" : userID },
    {
      $addToSet: {
        interest: { $each: interest || [] }
      },
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User interest updated successfully" });
});

// Endpoint 4: show selected interest in interests tab after login

app.get('/user/interests/:userID', async (req, res) => {
  const userID = req.params.userID;
  // Fetch user's interests from MongoDB
  const user = await User.findOne({ "_id": userID });
  
  if (user) {
    res.json({ interests: user.interest });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});


// Endpoint 3: Delete User
app.delete("/user/delete", async (req, res) => {
  const { email } = req.body;

  // Delete user from MongoDB
  const result = await User.deleteOne({ email });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
});

// Endpoint 4: Get All Users
app.get("/user/getAll", async (req, res) => {
  // Retrieve all users from MongoDB
  const allUsers = await User.find();

  // Filter out sensitive information (passwords)
  const sanitizedUsers = allUsers.map(({ userName, _id, bio, interest, interested }) => ({
    userName,
    _id,
    bio,
    interest,
    interested,
  }));

  res.json(sanitizedUsers);
});

// Endpoint 5: Get User Details by UserID
app.get("/user/getUser/:userID", async (req, res) => {

  const allUsers = await User.find(
    {
      "_id" : new ObjectId(req.params.userID)
    }
  ).toArray();

  const sanitizedUsers = allUsers.map(({ fullName, email }) => ({
    fullName,
    email
  }));

  return res.status(200).json(sanitizedUsers)

})



// Endpoint 6: Get viewProfile by UserID
// app.get("/user/viewProfile/:userID", async (req, res) => {

//   const allUsers = await User.find(
//     {
//       "_id" : new ObjectId(req.params.userID)
//     }
//   ).toArray();

//   const sanitizedUsers = allUsers.map(({ fullName, email, interested, _id }) => ({
//     fullName,
//     email,
//     interested,
//     _id,
//   }));

//   return res.status(200).json(sanitizedUsers)

// })

// Endpoint 6: Update User interested from feeds
app.put("/user/interested/:userID", async (req, res) => {
  const {  interested  } = req.body;
  const userID = req.params.userID;
  // Update user details in MongoDB
  const result = await User.updateOne(
    { "_id" : userID },
    {
      $addToSet: {
        interested,
      },
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User details updated successfully" });
});

// Endpoint 7: Update connected
app.put("/user/connected/:userID", async (req, res) => {
  const {  connected  } = req.body;
  const userID = req.params.userID;
  // Update user details in MongoDB
  const result = await User.updateOne(
    { "_id" : userID },
    {
      $addToSet: {
        connected,
      },
    }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ message: "User details updated successfully" });
});


// backend route to fetch posts of connected users
app.get('/posts/feed/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('connected');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find posts from connected users
    const posts = await Post.find({ userId: { $in: user.connected } })
                             .sort({ createdAt: -1 });  // Fetch in reverse chronological order

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});


// // Endpoint 5: User Login
// app.post("/user/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Check if email exists in the database
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(201).json({ error: "User not found" });
//   }

//   // Validate the password
//   if (!bcrypt.compareSync(password, user.password)) {
//     return res.status(201).json({ error: "Invalid credentials" });
//   }

//   // res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
//   // Password is correct, user is authenticated
//   // res.json({ message: "Login successful" });
//   const userID = user._id.toString();
//   return res.status(200).json({userID : userID})
//   // return res.json({ token: userID, message: "Login successful" });
// });


// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
