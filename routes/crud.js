var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({ dest: '/Users/chrisrandle/CDN/uploads/'});
var database = require('../classes/database-motm.js');

// ============================================================
// Create mongodb data
router.post('/add', function(req, res) {
  // Extract & log
  var body = req.body;
  // console.log("CRUD - Recieved add request: " + JSON.stringify(body));

  // Perform the database load (add) operaton on the created object
  var toLoad = [];
  toLoad.push(body);
  returnCreate(toLoad, res);
});

//======================= IMAGE WORK START
// Create image file
router.post('/image', function(req, res){
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});
//======================== IMAGE WORK END
// Return full mongodb collection
router.get('/get/:collection', function(req, res) {
  var collection = req.params.collection;
  returnGet(collection, res);
});

// Return mongodb document
router.get('/one/:momID', function(req, res) {
    var momID = req.params.momID;
    returnOne(momID, res);
});

// Update mongodb data
router.post('/update', function(req, res) {
  // Extract & log
  var body = req.body;
  // console.log("CRUD - Recieved update request: " + JSON.stringify(body));

  // Perform the database load (add) operaton on the created object
  var toLoad = [];
  toLoad.push(body);
  returnUpdate(toLoad, res);
});

// Delete mongodb data
router.delete('/del', function(req, res) {
  // Extract & log
  var body = req.body;
  // console.log("CRUD - Recieved delete request for ID: " + JSON.stringify(body));

  // Perform removal from database
  database.remove(body);

  // Render page notifying success
  res.send(req.body);
});

// ===================================================================
// Helper function with async callback - for read
var returnGet = function(collection, res) {
  database.get(collection, function(toSend) {
    res.send(toSend);
  });
};

// Helper function with async callback - for read single document
var returnOne = function(momID, res) {
    database.one(momID, function(toSend) {
        res.send(toSend)
    });
};

// Helper function with async callback - for create
var returnCreate = function(toLoad, res) {
  database.load(toLoad, function(toSend) {
    res.send(toSend);
  });
};

// Helper function with async callback - for update
var returnUpdate = function(toLoad, res) {
  database.update(toLoad, function(toSend) {
    res.send(toSend);
  });
};

module.exports = router;
