var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mdb = require('mongodb');

// Config options
//var url = 'mongodb://localhost:27017/pdb101v3';
var url = 'mongodb://localhost:27017/pdb101v1';

// ============================================================
// Public functions
exports.test = function () {
    test();
};

exports.load = function (object, callback) {
    createWrapper(object, callback);
};

exports.update = function (object, callback) {
    updateWrapper(object, callback);
};

exports.get = function (object, callback) {
    readWrapper(object, callback);
};

// TODO Modify to get one of motm_articles or jmol by momID
exports.one = function (momID, callback) {
    oneWrapper(momID, callback);
};

exports.recent = function(callback){
    recentWrapper(callback);
};

exports.remove = function (callback) {
    deleteWrapper(callback);
};

exports.getCategories = function (callback) {
    readCategoriesWrapper(callback);
};

// ============================================================
// Private (meta) functions
var createWrapper = function (object, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        insertProject(db, object, function (result) {
            end(db);
            callback(result);
        });
    });
};

var readWrapper = function (object, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        var docHolder;
        findDocuments(db, object, function (docHolder) {
            end(db);
            callback(docHolder);
        });
    });
};

var readCategoriesWrapper = function (callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        var docHolder;
        findCategoriesDocuments(db, function (docHolder) {
            end(db);
            callback(docHolder);
        });
    });
};

var oneWrapper = function (momID, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 momID DB connection");
        assert.equal(null, err);
        findDoc(db, momID, function (result) {
            end(db);
            callback(result);
        });
    });
};

var recentWrapper = function (callback){
    MongoClient.connect(url, function(err, db){
        assert.equal(null,err);
        findMostRecent(db, function(result){
            end(db);
            callback(result);
        });
    });
};

var updateWrapper = function (object, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        updateDocument(db, object[0], function (result) {
            end(db);
            callback(result);
        });
    });
};

var deleteWrapper = function (target) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        removeDocument(db, target, function () {
            end(db);
        });
    });
};

// ============================================================
// Individual functions

// Disconnect
var end = function (db) {
    db.close();
    //console.log("-1 DB close");
}

// Update
var updateDocument = function (db, target, callback) {
    // Get the documents collection
    var collection = db.collection('motm_articles');
    // Update document where a is 2, set b equal to 1
    //console.log("Updating project with ID [" + target.id + "] -> setting [" + JSON.stringify(target) + "]");
    collection.update({_id: new mdb.ObjectID(target.id)}, {$set: target}, function (err, result) {
        assert.equal(err, null);
        callback('success');
    });
}

// Remove
var removeDocument = function (db, target, callback) {
    // Get the documents collection
    var collection = db.collection('motm_articles');
    // Insert some documents
    //console.log("Trying to remove: " + target.id);
    collection.remove({_id: new mdb.ObjectID(target.id)}, function (err, result) {
        assert.equal(err, null);
        //console.log("Result: " + result);
        callback(result);
    });
}

// Remove all motm_artciles
var removeAllDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('motm_articles');
    // Insert some documents
    collection.remove({}, function (err, result) {
        assert.equal(err, null);
        callback(result);
    });
};

// Find all motm_articles
var findDocuments = function (db, object, callback) {
    // Get the documents collection
    var collection = db.collection(object);
    // Find some documents
    collection.find({}).sort({id: -1}).toArray(function (err, docs) {
        assert.equal(err, null);
        // console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
};

// Find all categories
var findCategoriesDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('categories');
    // Find some documents
    collection.find({}).sort({id: -1}).toArray(function (err, docs) {
        assert.equal(err, null);
        // console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
};

// Find one motm_articles
var findDoc = function (db, momID, callback) {
    var collection = db.collection('motm_articles');
    collection.find({_id: new mdb.ObjectID(momID)}).toArray(function (err, docArray) {
        assert.equal(err, null);
        //console.log("docArray", docArray);
        callback(docArray[0])
    });
};

// TODO this is very similar to findDoc & findDocuments - perhaps merge them.
// Fine most recent motm_articles legacy momID
var findMostRecent = function(db, callback){
    var collection = db.collection('motm_articles');
    collection.find({}, {id: 1}).sort({id: -1}).limit(1).toArray(function(err, mostRecent){
        assert.equal(err, null);
        callback(mostRecent[0]);
    });
};

// Insert
var insertProject = function (db, object, callback) {
    // Get the documents collection
    var collection = db.motm_articles;
    // Insert some documents
    collection.insert(object, function (err, result) {
        assert.equal(err, null);
        assert.equal(object.length, result.length);
        // console.log("Result: " + JSON.stringify(result));
        callback(result);
    });
}
