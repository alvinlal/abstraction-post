const Article = require("../models/article");

exports.updateLikes = (req, res) => {
  const action = req.body.action;
  const articleId = req.body.articleId;
  // console.log(action, articleId);
  if (action == "like") {
    Article.updateOne(
      { _id: articleId },
      { $inc: { likesCount: 1 }, $push: { likes: req.user.id } },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            error: "Can't perform action",
          });
        } else if (doc) {
          if (doc.nModified == 1 && doc.ok == 1) {
            return res.status(200).json({
              status: 1,
            });
          } else {
            return res.status(500).json({
              status: 0,
            });
          }
        }
      }
    );
  } else if (action == "unlike") {
    Article.updateOne(
      { _id: articleId },
      { $inc: { likesCount: -1 }, $pull: { likes: req.user.id } },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            error: "Can't perform action",
          });
        } else if (doc) {
          if (doc.nModified == 1 && doc.ok == 1) {
            return res.status(200).json({
              status: 1,
            });
          } else {
            return res.status(500).json({
              status: 0,
            });
          }
        }
      }
    );
  }
};
