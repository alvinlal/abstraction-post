const express = require("express");
const router = express.Router();
const { isSignedIn } = require("../controllers/auth");
const { saveImage } = require("../controllers/image");

router.post("/imageupload", isSignedIn, saveImage);

module.exports = router;
