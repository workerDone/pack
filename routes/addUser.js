let express = require('express');
let router = express.Router();

let url = 'mongodb://Ivan:Ivan@cluster0-shard-00-00-n5kxm.mongodb.net:27017,cluster0-shard-00-01-n5kxm.mongodb.net:27017,cluster0-shard-00-02-n5kxm.mongodb.net:27017/MyMonDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

router.post('*', function (req, res, next) {
    console.log('hello')
    MongoClient.connect(url, function (err, db) {

        assert.equal(null, err);
        let collection = db.collection('name');

        collection.find({ "email": req.body.email })
            .toArray(function (err, docs) {
                if (docs.length) {
                    res.json({"user": "user already exists"});
                } else {
                    next();
                }
                db.close();
            })
    })
});

router.post('*', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        let collection = db.collection('name');

        collection.insert({
            "name": req.body.name,
            "email": req.body.email
        }, function (err, docs) {
            if (err) {
                res.json(err)
            } else {
                res.json(docs);
            }
            db.close();
        })
    })
});

module.exports = router;
