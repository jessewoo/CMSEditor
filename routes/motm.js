var express = require('express');
var router = express.Router();
// Mongo Database related
var database = require('../classes/database-motm.js');

// ============================================================
// Human visable "pages"

// Provide the list of all MotM's
router.get('/', function (req, res, next) {
    res.render('motm/list', {title: 'View - Molecule of the Month\'s'});
});

// Get MOTM single view
router.get('/:id', function (req, res) {
    //console.log("Editing ->", req.params.id);
    res.render('motm/editor', {title: 'Edit - Molecule of the Month\'s', id: req.params.id});
});

// Go to - motm editor page
router.get('/new', function (req, res, next) {
    res.render('motm/editor', {title: 'New - Molecule of the Month\'s'});
});


// ============================================================
// REST url's

// Returns the entire content of a collection
router.get('/all/:collection', function (req, res) {
    returnAll(req.params.collection, res);
});

// Return one document from ANY collection where the MongoDB ID matches
router.get('/one/:id', function (req, res) {
    returnOne(req.params.id, res);
});

// Return the last "legacy MotM ID" in the database
router.get('/lastID', function (req, res) {
    returnRecent(res);
});

// Create mongodb data
//router.post('/add', function(req, res) {
//  // Extract & log
//  var body = req.body;
//  // console.log("CRUD - Recieved add request: " + JSON.stringify(body));
//
//  // Perform the database load (add) operaton on the created object
//  var toLoad = [];
//  toLoad.push(body);
//  returnCreate(toLoad, res);
//});

// Update mongodb data
//router.post('/update', function(req, res) {
//  // Extract & log
//  var body = req.body;
//  // console.log("CRUD - Recieved update request: " + JSON.stringify(body));
//
//  // Perform the database load (add) operaton on the created object
//  var toLoad = [];
//  toLoad.push(body);
//  returnUpdate(toLoad, res);
//});

// Delete mongodb data
//router.delete('/del', function(req, res) {
//  // Extract & log
//  var body = req.body;
//  // console.log("CRUD - Recieved delete request for ID: " + JSON.stringify(body));
//
//  // Perform removal from database
//  database.remove(body);
//
//  // Render page notifying success
//  res.send(req.body);
//});

// TODO create appropriate all requester for jmol db.jmol one
// ===================================================================
// Helper function with async callback - for read
var returnAll = function (collection, res) {
    database.get(collection, function (toSend) {
        res.send(toSend);
    });
};

// Helper function with async callback - for read single document
var returnOne = function (momID, res) {
    database.one(momID, function (toSend) {
        res.send(toSend);
    });
};

// Helper function with async callback - for read most recent motm_article legacy momID
var returnRecent = function (res) {
    database.recent(function (toSend) {
        res.send(toSend);
    });
};

// Helper function with async callback - for create
var returnCreate = function (toLoad, res) {
    database.load(toLoad, function (toSend) {
        res.send(toSend);
    });
};

// Helper function with async callback - for update
var returnUpdate = function (toLoad, res) {
    database.update(toLoad, function (toSend) {
        res.send(toSend);
    });
};

module.exports = router;
