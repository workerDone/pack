
var app = require('./settings');
var url = 'mongodb://Ivan:Ivan@cluster0-shard-00-00-n5kxm.mongodb.net:27017,cluster0-shard-00-01-n5kxm.mongodb.net:27017,cluster0-shard-00-02-n5kxm.mongodb.net:27017/MyMonDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
// var url = 'mongodb://localhost:27017/name'; 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var error = require('./routes/error');

app.post('/products', function (req, res, next) {

  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    var collection = db.collection('name');

    collection.insert({
      name: req.body.name,
      gender: req.body.email
    }, function (err, docs) {
      if (err) {
        res.json(err)
        db.close();
      } else {
        res.json(docs);
        db.close();
      }
    })
  })
});

app.post('/find', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {

    assert.equal(null, err);
    var collection = db.collection('name');

    collection.find({}).toArray(function (err, docs) {
      res.json(docs);
      db.close();
    })
  })
})
app.get('/hello', function (req, res, next) {
  res.json({ 'hello': 'man' })
})


app.get('/man', function (req, res, next) {
  const options = {
    method: 'POST',
    uri: 'https://jsonplaceholder.typicode.com/posts',
    body: {
      hello: "man"
    }
  };
  request(options)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (err) {
      res.json({ response: 'error' })
    })

})

app.get('/products', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for a whitelisted domain.' })
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('*', error);

module.exports = app;
