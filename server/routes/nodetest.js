//nodetest.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let getStr = req.query.str;
  let getNum = Number(req.query.num);

  console.log(`getStr : ${getStr}, type : ${typeof getStr}`);
  console.log(`getNum : ${getNum}, type : ${typeof getNum}`);
  
  res.send({ result:"success" });

  return;
});

module.exports = router;