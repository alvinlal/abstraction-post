const express = require("express");
const router = express.Router();
const { isSignedIn, getUserData } = require("../controllers/auth");
const {
  publishArticle,
  getArticlesByTag,
  getArticles,
  getArticle,
  getArticleById,
} = require("../controllers/article");

router.param("tag", getArticlesByTag);
router.param("id", getArticleById);

router.post("/article/publish", isSignedIn, publishArticle);
router.get("/articles/:tag", getUserData, getArticles);
router.get("/article/:id", getArticle);

module.exports = router;
