var express = require('express');
var router = express.Router();

/* GET motm listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('motm_articles');
  collection.find({},{},function(e,docs){
    console.log(JSON.stringify(docs))
    res.render('motm', {
      "motm_articles" : docs
    });
  });
  //res.send('respond with a resource');
});

module.exports = router;
