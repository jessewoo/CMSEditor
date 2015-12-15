var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS Editor' });
});

/* Get MOTM home page. */
router.get('/motm', function(req, res, next) {
  res.render('motm', { title: 'Molecule of the Month Editor' });
});

/* Get MOTM single view */
router.get('/motm/:momID', function(req, res){
    var momID = req.params.momID;
    res.render('editMotm', {momID : momID});
});

/* GET motm editor page. */
router.get('/tool', function(req, res, next) {
  res.render('editMotm', { title: 'Molecule of the Month Editor' });
});

router.get('/image', function(req, res, next){
   res.render('image', { title: 'IMAGE THINGY'});
});
module.exports = router;
