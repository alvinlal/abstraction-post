const Article = require("../models/article");
const Tags = require("../models/tags");

const getMonths = (num) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[num];
};

exports.publishArticle = (req, res) => {
  const { article, tags, title, description, titleImage } = req.body;

  Tags.updateOne(
    { _id: "5eb42ce3941bdf03702bbca1" },
    { $addToSet: { tags: { $each: tags } } },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else if (doc) {
        return;
      }
    }
  );

  var articleDate = new Date(article.time);
  const month = getMonths(articleDate.getMonth());
  const year = articleDate.getFullYear();
  const day = articleDate.getDate();
  const date = `${month}-${day},${year}`;
  const author = req.user.userName;
  const newArticle = new Article({
    author,
    date,
    title,
    description,
    titleImage,
    tags,
    article,
  });
  newArticle.save((err, doc) => {
    if (err) {
      return res.status(500).json({
        error: "Can't publish article",
      });
    } else if (doc) {
      return res.status(200).json({
        status: "ok",
      });
    }
  });
};

exports.getArticlesByTag = async (req, res, next, tag) => {
  const page = parseInt(req.query.pageNumber);

  const limit = 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  var results = {};

  if (endIndex < (await Article.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page + 1,
      limit: limit,
    };
  }

  Article.find(
    { tags: { $in: [tag] } },
    {
      _id: 1,
      tags: 1,
      title: 1,
      titleImage: 1,
      description: 1,
      author: 1,
      date: 1,
      likes: 1,
      bookmarks: 1,
      "article.time": 1,
    }
  )

    .limit(limit)
    .skip(startIndex)
    .exec((err, docs) => {
      if (err) {
        return res.status(500).json({
          error: "Cant get articles",
        });
      } else if (docs) {
        results.articlesData = docs;
        res.paginatedResults = results;
        next();
      }
    });
};

exports.getArticleById = (req, res, next, id) => {
  Article.findById(id, (err, doc) => {
    if (err) {
      return res.status(500).json({
        error: "Can't find article",
      });
    } else if (doc) {
      req.article = doc;
      next();
    }
  });
};
exports.getArticle = (req, res) => {
  const article = req.article;
  return res.status(200).json({
    articleData: article,
  });
};

exports.getArticles = (req, res) => {
  if (req.userData) {
    for (
      let i = 0, docslen = res.paginatedResults.articlesData.length;
      i < docslen;
      i++
    ) {
      if (
        res.paginatedResults.articlesData[i].likes.includes(req.userData.id)
      ) {
        res.paginatedResults.articlesData[i].set("isLiked", true);
      } else {
        res.paginatedResults.articlesData[i].set("isLiked", false);
      }
      if (
        res.paginatedResults.articlesData[i].bookmarks.includes(req.userData.id)
      ) {
        res.paginatedResults.articlesData[i].set("isBookMarked", true);
      } else {
        res.paginatedResults.articlesData[i].set("isBookMarked", false);
      }
    }
  }

  const articles = res.paginatedResults;

  return res.status(200).json({
    articles,
  });
};
