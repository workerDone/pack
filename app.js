
let app = require('./settings');
let url = 'mongodb://Ivan:Ivan@cluster0-shard-00-00-n5kxm.mongodb.net:27017,cluster0-shard-00-01-n5kxm.mongodb.net:27017,cluster0-shard-00-02-n5kxm.mongodb.net:27017/MyMonDb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
// let url = 'mongodb://localhost:27017/name'; 
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let error = require('./routes/error');
let registration = require('./routes/registration');
let login = require('./routes/login');
app.use('/',indexRouter)
app.use('/registration', registration);
app.use('/login', login);

app.post('/find', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {

    assert.equal(null, err);
    let collection = db.collection('name');

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
