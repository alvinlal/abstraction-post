const mongoose = require("mongoose");
var objectId = mongoose.Types.ObjectId;
var User = require("./user").schema;
const articleSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      trim: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      default: null,
    },
    tags: {
      type: Array,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: [{ type: objectId, ref: "User" }],
    bookmarks: [{ type: objectId, ref: "User" }],
    article: {
      type: Object,
      required: true,
    },
  },

  { strict: false }
);

articleSchema.index({ title: "text" });

module.exports = mongoose.model("Article", articleSchema);
