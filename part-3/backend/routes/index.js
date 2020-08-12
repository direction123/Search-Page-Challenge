var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/countries', function(req, res, next) {
  fs.readFile('./data/countries.json', (err, data) => {
    if (err) throw err;
    res.status(200).send(JSON.parse(data));
  });
});

router.get('/searchResults', function(req, res, next) {
  fs.readFile('./data/searchResults.json', (err, data) => {
    if (err) throw err;
    res.status(200).send(JSON.parse(data));
  });
});

module.exports = router;
