var express = require('express');
var router = express.Router();

var database = require('./database.js');

// CUSTOM motm default page
// Base for server:3000/motm/
router.get('/', function(req,res,next) {
  var db = req.db;
  var collection = db.get('motm_articles');
  collection.find({},{},function(e,docs){
    // console.log(JSON.stringify(docs))
    res.render('motm', {
      "motm_articles" : docs
    });
  });
  //res.send('respond with a resource');
});

//Generic get request
router.get('/get', function(req, res) {
    returnGet(res);
});

//Fifty Generic Test
router.get('/january', function(req,res){
    returnGet(res);
});

//Get One Motm
router.get('/one', function(req,res){
    returnGet(res);
});

// ===================================================================
// Helper function with async callback - for read
var returnGet = function(res) {
    database.get(function(toSend) {
        res.send(toSend);
    });
};

module.exports = router;
