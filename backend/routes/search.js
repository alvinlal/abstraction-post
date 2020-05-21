const express = require("express");
const router = express.Router();
const { searchByParams } = require("../controllers/search");
const { getUserData } = require("../controllers/auth");

router.get("/search", getUserData, searchByParams);

module.exports = router;
