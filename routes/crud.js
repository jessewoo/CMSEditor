var express = require('express');
var router = express.Router();

var database = require('../classes/database-motm.js');
// ============================================================
// Create data
router.post('/add', function(req, res) {
  // Extract & log
  var body = req.body;
  // console.log("CRUD - Recieved add request: " + JSON.stringify(body));

  // Perform the database load (add) operaton on the created object
  var toLoad = [];
  toLoad.push(body);
  returnCreate(toLoad, res);
});

// Read data
router.get('/get', function(req, res) {
  returnGet(res);
});

// Return one document
router.get('/one/:momID', function(req, res) {
    var momID = req.params.momID;
    returnOne(momID, res);
});

// Update data
router.post('/update', function(req, res) {
  // Extract & log
  var body = req.body;
  // console.log("CRUD - Recieved update request: " + JSON.stringify(body));

  // Perform the database load (add) operaton on the created object
  var toLoad = [];
  toLoad.push(body);
  returnUpdate(toLoad, res);
});

// Delete data
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
var returnGet = function(res) {
  database.get(function(toSend) {
    res.send(toSend);
  });
};

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
