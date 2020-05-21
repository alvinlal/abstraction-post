const express = require("express");
const router = express.Router();
const getAllTags = require("../controllers/tag");
router.get("/tags", getAllTags);

module.exports = router;
