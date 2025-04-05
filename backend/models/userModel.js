const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @typedef User
 * @property {string} name.required - Full name of the user.
 * @property {string} email.required - Unique email address.
 * @property {string} password.required - Encrypted password.
 * @property {string} userName - Optional username.
 * @property {string} bio - Short bio of the user.
 * @property {Array} interest - Topics or areas of interest.
 * @property {Array} interested - People or entities the user is interested in.
 * @property {Array} connected - IDs of users this user is connected with.
 * @property {string} gender - Gender of the user.
 * @property {string} pic - Profile picture URL.
 * @property {boolean} isAdmin - Flag indicating admin privileges.
 * @property {Date} createdAt - Timestamp of creation.
 * @property {Date} updatedAt - Timestamp of last update.
 */

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userName: { type: String, default: "" },
    bio: { type: String, default: "" },
    interest: { type: Array, default: [] },
    interested: { type: Array, default: [] },
    connected: { type: Array, default: [] },
    gender: { type: String, default: "" },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Compare input password with hashed password in the database.
 * @method
 * @name matchPassword
 * @param {string} enteredPassword - The plain-text password to compare.
 * @returns {Promise<boolean>} - True if passwords match, else false.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Mongoose pre-save middleware to hash the password if modified.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
