const express = require("express");
const router = express.Router();
const { updateLikes } = require("../controllers/like");
const { isSignedIn } = require("../controllers/auth");

router.post("/likes", isSignedIn, updateLikes);

module.exports = router;
