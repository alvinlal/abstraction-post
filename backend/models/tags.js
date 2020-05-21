const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
  tags: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Tag", tagsSchema);
