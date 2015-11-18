var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Editor' });
});

/* GET home page. */
router.get('/motm', function(req, res, next) {
  //run ./view/tmp.jade
  res.render('motm', { title: 'Molecule of the Month Editor' });
});

/* GET home page. */
router.get('/tool', function(req, res, next) {
  //run ./view/tmp.jade
  res.render('tool', { title: 'Molecule of the Month Editor' });
});

module.exports = router;
