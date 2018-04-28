const express = require('express');
const router = express.Router();
let connect = require('../db');

router.post('*', function (req, res, next) {

    connect()
        .then((data) => {

            data.db('MyMonDb').collection('name')
                .find({})
                .toArray(function (err, docs) {
                    if (docs.length) {
                        res.json(docs);
                    } else {
                        res.json({ "user": "user don't exists" });
                    }
                    data.close();
                })
        })
});

module.exports = router;
