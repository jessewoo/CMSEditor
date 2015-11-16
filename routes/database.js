var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var mdb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
//URL for mongo
var url = 'mongodb://localhost:27017/pdb101v3';

// ============================================================
// Public functions
//exports.test = function () {
//    test();
//};

//exports.load = function (object, callback) {
//    createWrapper(object, callback);
//};

exports.get = function (callback) {
    readWrapper(callback);
}

exports.january = function(callback) {
    januaryWrapper(callback);
}

// ============================================================
// Private (meta) functions
var createWrapper = function(object, callback) {
    MongoClient.connect(url, function(err, db) {
        console.log("+1 DB connection");
        assert.equal(null, err);
        insertProject(db, object, function(result) {
            end(db);
            callback(result);
        });
    });
};

var readWrapper = function(callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var docHolder;
        findDocuments(db, function(docHolder) {
            end(db);
            callback(docHolder);
        });
    });
};

var januaryWrapper = function(callback) {
    MongoClient.connect(url, function(err,db) {
        assert.equal(null, err);
        findFifty(db, function() {
            db.close();
        })
    })
}


// ============================================================
// Individual functions

// Disconnect
var end = function(db) {
    db.close();
    // console.log("-1 DB close");
}

// Find all Molecule of the Month Articles
var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('motm_articles');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        docs = docs;
        callback(docs);
    });
}

var findjanuary = function(db, callback) {
    var cursor = db.collection('motm_articles').find({"month_name" : "january"});
    cursor.each(function(err, doc) {
        assert.qeual(err, null);
        if(doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
}