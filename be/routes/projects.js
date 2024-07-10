var express = require("express");
var router = express.Router();

const fs = require("fs");

/* GET projects listing. */

// WebGazer 프로젝트
router.get("/eyeve", async function (req, res, next) {
  const mime = await import("mime");
  const path = "/files/eyeve.pdf";
  // console.log(mime.getType(path));
  console.log(mime);
  // let spt = req.query.filePath.split("/");

  // console.log(spt);
  // console.log("/file/eyeve.pdf");

  res.send("respond with a resource");
});

module.exports = router;
