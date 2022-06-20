"use strict"
require('dotenv').config()
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


router.get('/', function (req, res, next) {
res.send(data)  
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10)
  res.send(movie)
});

module.exports = router;