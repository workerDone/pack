var express = require('express');
var router = express.Router();

let url = 'mongodb://Ivan:Ivan@cluster0-shard-00-00-n5kxm.mongodb.net:27017,cluster0-shard-00-01-n5kxm.mongodb.net:27017,cluster0-shard-00-02-n5kxm.mongodb.net:27017/MyMonDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

// let jwt = require('jwt');

router.post('*', function(req, res, next) {
  
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);

        let collection = db.collection('name');
 

        collection.find({ "email": req.body.email , "name": req.body.name, "password": req.body.password})
            .toArray(function (err, docs) {
                if (docs.length) {
                    res.json({"token": docs[0].token});
                } else {
                    res.json({"user": "user don't exists"});
                }
                db.close();
            })
    })
});

module.exports = router;
