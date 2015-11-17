var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://localhost:27017/pdb101v3');

var assert = require('assert');

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

exports.one = function(callback) {
    oneWrapper(callback);
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
    var collection = db.get('motm_articles');
    collection.find({},{},function(e,docs){
        res.render('motm', {
            "motm_articles" : docs
        });
    });
}

var januaryWrapper = function(callback) {
    MongoClient.connect(url, function(err,db) {
        assert.equal(null, err);
        findjanuary(db, function() {
            db.close();
        })
    })
}

var oneWrapper = function(callback) {
    MongoClient.connect(url, function(err,db) {
        assert.equal(null, err);
        findOne(db, function() {
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
        console.log(docs);
        assert.equal(err, null);
        docs = docs;
        callback(docs);
    });
}

var findjanuary = function(db, callback) {
    var collection = db.collection('motm_articles');
    collection.count({"month_name":"January"}).toInt(function(err,docs) {
        console.log(docs);
    });


    // collection.toArray(function(err, doc) {
    //     assert.equal(err, null);
    //     if(doc != null) {
    //         console.dir(doc);
    //     } else {
    //         callback();
    //     }
    // });
}


var findOne = function(db, callback) {
    var collection1 = db.collection('motm_articles');
    collection1.find({ "title":"Myoglobin"}).each(function(err, docs) {
        assert.equal(err, null);
        if (docs != null) {
          console.dir(docs);
        } else {
          callback();
        }
    });
}
