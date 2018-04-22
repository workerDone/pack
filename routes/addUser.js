let express = require('express');
let router = express.Router();

let url = 'mongodb://Ivan:Ivan@cluster0-shard-00-00-n5kxm.mongodb.net:27017,cluster0-shard-00-01-n5kxm.mongodb.net:27017,cluster0-shard-00-02-n5kxm.mongodb.net:27017/MyMonDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

const Joi = require('joi');
 
const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    // access_token: [Joi.string(), Joi.number()],
    // birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email()
}).with('username', 'birthyear').without('password', 'access_token');

router.post('*', function (req, res, next) {

    MongoClient.connect(url, function (err, db) {

        Joi.validate(req.body, schema, function (err, value) { 
            if ( err ) {
                res.json(err.message)
            }
        }); 

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
            "password": req.body.password,
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
