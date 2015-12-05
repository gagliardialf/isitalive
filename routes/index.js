var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  res.status(200).send('Welcome to Alive or Dead!');
});

module.exports = router;