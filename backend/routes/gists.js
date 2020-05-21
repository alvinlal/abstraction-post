const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/gists", (req, res) => {
  axios({
    method: "GET",
    url: req.body.gistLink + ".json",
  })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((err) => {
      return res.status(500).json({
        err,
      });
    });
});

module.exports = router;
