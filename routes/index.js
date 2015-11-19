var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Editor' });
});

/* Get MOTM home page. */
router.get('/motm', function(req, res, next) {
  //run ./view/tmp.jade
  res.render('motm', { title: 'Molecule of the Month Editor' });
});

/* Get MOTM single view */
router.get('/motm/:momID', function(req, res){
    //res.send("Molecule of the Month #: " + req.params.momID);
    var momID = req.params.momID;
    console.log(momID);
    res.render('editMotm', {momID : momID});
});

/* GET motm editor page. */
router.get('/tool', function(req, res, next) {
  //run ./view/tmp.jade
  res.render('tool', { title: 'Molecule of the Month Editor' });
});

module.exports = router;
