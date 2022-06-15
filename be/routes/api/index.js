var express = require('express');
var path = require("path") 
var router = express.Router();
var testRouter = require('./test');
var userRouter = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html')); 
});

router.use('/test', testRouter);
router.use('/user', userRouter);

module.exports = router;
