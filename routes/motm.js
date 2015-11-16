var express = require('express');
var router = express.Router();

/* GET motm listing. */
//Base for server:3000/motm/
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

//Make a new route under server:3000/motm/STUFF
router.get('/count', function(request,response,next) {
  var db = request.db;
  var collection = db.get('motm_articles');
  collection.find({_momID:o_motmID},{},function(error,cursor){
    cursor.toArray(callback);
    //response.render('motm', {"motm_articles" : docs });
  });
});

module.exports = router;
