//fileDelete.js
const slib = require("./serverlib");
const express = require("express");
const router = express.Router();
const shell = require("shelljs"); // npm install shelljs --save

router.get("/", (req, res) => {
  let fileName = slib.changeBlankFileNameWindow(req.query.fileName);

  shell.cd("~");

  let result;
  if (shell.exec(`rm ${fileName}`).code !== 0) {
    result = "failed";
  } else {
    result = "success";
  }

  res.send({ result });

  return;
});

module.exports = router;