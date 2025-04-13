const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserDomains,
  updateUserInterests,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.put("/interest", updateUserInterests);
router.get("/getDomains/:userId", getUserDomains)

module.exports = router;
