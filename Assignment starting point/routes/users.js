var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const Documents = require("../models/Documents");

//mongoose.connect("mongodb://localhost:27017/documents")

/* GET users listing. */
router.get('/hello', function(req, res, next) {
  const a = {
    author: "hello"
  }
 
  res.send("save to db")
});

module.exports = router;
