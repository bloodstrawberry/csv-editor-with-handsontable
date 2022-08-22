// getFile.js
const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  let path = req.query.path;
  let info = fs.readFileSync(`${path}`, "utf8");

  res.send({ info });
});

module.exports = router;