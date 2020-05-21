const express = require("express");
const router = express.Router();
const { getBookMarks, updateBookMarks } = require("../controllers/bookmark");
const { isSignedIn } = require("../controllers/auth");
router.get("/bookmarks", isSignedIn, getBookMarks);
router.post("/bookmarks", isSignedIn, updateBookMarks);

module.exports = router;
