const Article = require("../models/article");

exports.searchByParams = async (req, res) => {
  const queryString = req.query.queryString;
  const page = parseInt(req.query.pageNumber);

  const limit = 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const searchWord = `${queryString}`;

  Article.find(
    {
      $text: {
        $search: searchWord,
        $caseSensitive: false,
        $language: "en",
      },
    },
    {
      title: 1,
      titleImage: 1,
      description: 1,
      date: 1,
      author: 1,
      tags: 1,
      likes: 1,
      bookmarks: 1,
    }
  )
    .limit(limit)
    .skip(startIndex)
    .exec((err, docs) => {
      if (err) {
        return res.status(500).json({
          error: "Can't get results",
        });
      } else if (docs) {
        if (req.userData) {
          for (let i = 0, docslen = docs.length; i < docslen; i++) {
            if (docs[i].likes.includes(req.userData.id)) {
              docs[i].set("isLiked", true);
            } else {
              docs[i].set("isLiked", false);
            }
            if (docs[i].bookmarks.includes(req.userData.id)) {
              docs[i].set("isBookMarked", true);
            } else {
              docs[i].set("isBookMarked", false);
            }
          }
        }
        return res.status(200).json({
          results: docs,
        });
      }
    });
};
