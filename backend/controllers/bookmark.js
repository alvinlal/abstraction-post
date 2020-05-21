const User = require("../models/user");
const Article = require("../models/article");

exports.getBookMarks = (req, res) => {
  User.findOne({ _id: req.user.id }, { bookmarks: 1 })
    .populate("bookmarks")
    .exec((err, docs) => {
      if (err) {
        return res.status(500).json({
          error: "Can't get bookmarks",
        });
      } else if (docs) {
        if (req.user) {
          for (let i = 0, docslen = docs.bookmarks.length; i < docslen; i++) {
            if (docs.bookmarks[i].likes.includes(req.user.id)) {
              docs.bookmarks[i].set("isLiked", true);
            } else {
              docs.bookmarks[i].set("isLiked", false);
            }
            if (docs.bookmarks[i].bookmarks.includes(req.user.id)) {
              docs.bookmarks[i].set("isBookMarked", true);
            } else {
              docs.bookmarks[i].set("isBookMarked", false);
            }
          }
        }
        return res.status(200).json({
          bookmarks: docs.bookmarks,
        });
      }
    });
};

exports.updateBookMarks = (req, res) => {
  const { action, articleId } = req.body;

  if (action == "bookMark") {
    User.updateOne(
      { _id: req.user.id },
      { $push: { bookmarks: articleId } },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            error: "Can't perform action",
          });
        } else if (doc) {
          if (doc.nModified == 1 && doc.ok == 1) {
            Article.updateOne(
              { _id: articleId },
              { $push: { bookmarks: req.user.id } },
              (err, doc) => {
                if (err) {
                  return res.status(500).json({
                    error: "Can't perform action",
                  });
                } else if (doc) {
                  return res.status(200).json({
                    status: 1,
                  });
                }
              }
            );
          } else {
            return res.status(500).json({
              status: 0,
            });
          }
        }
      }
    );
  } else if (action == "unBookMark") {
    User.updateOne(
      { _id: req.user.id },
      { $pull: { bookmarks: articleId } },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            error: "Can't perform action",
          });
        } else if (doc) {
          if (doc.nModified == 1 && doc.ok == 1) {
            Article.updateOne(
              { _id: articleId },
              { $pull: { bookmarks: req.user.id } },
              (err, doc) => {
                if (err) {
                  return res.status(500).json({
                    error: "Can't perform action",
                  });
                } else if (doc) {
                  return res.status(200).json({
                    status: 1,
                  });
                }
              }
            );
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
