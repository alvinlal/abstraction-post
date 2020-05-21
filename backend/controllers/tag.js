const Tags = require("../models/tags");

module.exports = getAllTags = (req, res) => {
  Tags.find({}, (err, doc) => {
    if (err) {
      return res.status(500).json({
        error: "Can't get tags",
      });
    } else if (doc) {
      return res.status(200).json({
        tags: doc[0].tags,
      });
    }
  });
};
