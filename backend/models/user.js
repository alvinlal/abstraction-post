const mongoose = require("mongoose");

//SCHEMA DEFINITION FOR USER
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    bookmarks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Article",
      },
    ],
    // posts: [{ type: ObjectId, ref: "Post" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
