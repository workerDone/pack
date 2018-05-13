let express = require('express');
let router = express.Router();
let connect = require('../db');
let connect1 = require('../db');


const Joi = require('joi');

const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email(),
    // access_token: [Joi.string(), Joi.number()],
    // birthyear: Joi.number().integer().min(1900).max(2013),

}).with('name', 'password').without('password', 'access_token');

router.post('*', function (req, res, next) {

    Joi.validate(req.body, schema, function (err, value) {
        if (err) {

            res.json(err.message)
        }
    });

    connect()
        .then(data => {
            data.db('MyMonDb').collection('name')
                .find({ "email": req.body.email })
                .toArray(function (err, docs) {
                    try {
                        if (docs.length) {
                            res.json({ "user": "user already exists" });
                        } else {
                            next();
                        }
                    } catch (e) {
                        res.status(404).json({ "message": "So registration throw error" })
                    }
                    data.close();
                })
        })
        .catch(err => {
            res.status(405).json({ "message": "DB doesn't connect" })
        })
});

router.post('*', function (req, res, next) {

    connect1()
        .then(data => {
            data.db('MyMonDb').collection('name')
                .insert({
                    "name": req.body.name,
                    "password": req.body.password,
                    "email": req.body.email,
                    "token": +new Date() + req.body.name + 10000000 * +new Date()
                }, function (err, docs) {      
                    try {
                        if (err) {
                            res.json(err)
                        } else {
                            res.json(docs);
                        }
                    } catch (e) {
                        res.status(404).json({ "message": "User is doesn't added " })
                    }
                    data.close();
                })
        })
        .catch(err => {
            res.status(405).json({ "message": "DB doesn't connect" })
        })
});

module.exports = router;
