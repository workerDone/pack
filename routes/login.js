var express = require('express');
const router = express.Router();
let connect = require('../db');


router.post('*', function(req, res, next) {
    connect()
        .then((data) => {
            try {

            
            data.db('MyMonDb').collection('name')
            .find({ "email": req.body.email , "name": req.body.name, "password": req.body.password})
                .toArray(function (err, docs) {
                    if (docs.length) {
                        res.json(docs);
                    } else {
                        res.json({"user": "user don't exists"});
                    }
                    data.close();
                })
            } catch (error) {
                res.send(error)
            }
        })
});

module.exports = router;
