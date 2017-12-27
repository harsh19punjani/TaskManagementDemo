var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hi there Arjun Here...');
});

/* GET home page. */
router.get('/kedar', function(req, res, next) {
  res.send('Hi there Kedar Here...');
});

/* GET home page. */
router.post('/tarun', function(req, res, next) {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

module.exports = router;
