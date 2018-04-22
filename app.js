
var app = require('./settings');
var url = 'mongodb://Chmut:1111>@name-shard-00-00-pw0kg.mongodb.net:27017,name-shard-00-01-pw0kg.mongodb.net:27017,name-shard-00-02-pw0kg.mongodb.net:27017/name?ssl=true&replicaSet=name-shard-0&authSource=admin' 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var error = require('./routes/error');

app.post('/products', function (req, res, next) {
  console.log('file')
  MongoClient.connect(url, function(err, db) {
    
    assert.equal(null, err);
    var collection = db.collection('name');
   
   collection.insert({
     name: req.body.name,
     gender: req.body.email
   }, function(err, docs) {
     console.log(docs)
    if (err) {
      console.log(err)
      
      res.json(err)
      db.close();
    } else {
      console.log(docs)
      res.json(docs);
      db.close();
    }
  // collection.find({}).toArray ( function (err, docs) {
  //   console.log(docs);
  //   res.json(docs);
    // db.close();
  })
   })
  // res.send(req.body)
});

app.get('/hello', function (req, res, next) {
  res.json({'hello': 'man'})
})


app.get('/man', function (req, res, next) {
 const options = {
  method: 'POST',
  uri: 'https://jsonplaceholder.typicode.com/posts',
  body : {
    hello: "man"
  }
 };
  request(options)
 .then(function (response) {
     // Запрос был успешным, используйте объект ответа как хотите
     res.json(response)
 })
 .catch(function (err) {
  res.json({response: 'error'})
 })
  
})

app.get('/products', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
 app.use('*', error);

module.exports = app;
