//fileSave.js
const express = require("express");
const router = express.Router();
const fs = require("fs");

const bodyParser = require("body-parser"); //npm install body-parser

router.use(bodyParser.json({ limit: "1MB" })); 

router.post("/", (req, res) => {
  let fileName = req.query.fileName;
  let content = req.body.file;

  fs.writeFile(fileName, content, "utf8", function (error) {
    console.log("write end");
  });

  res.send({ result: "success" });
});

module.exports = router;