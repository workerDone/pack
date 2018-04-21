var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 
const request = require('request-promise')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/name';
// Cors
var cors = require('cors')

var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.get('/products', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
})


app.post('/products', function (req, res, next) {
  console.log('file')
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var collection = db.collection('more');
   
  //  collection.insert({
  //    name: req.body.name,
  //    gender: req.body.email
  //  }, function(err, docs) {
  //    console.log(docs)
  //   if (err) {
  //     res.json(err)
  //     db.close();
  //   } else {
  //     res.json(docs);
  //     db.close();
  //   }
  collection.find({}).toArray ( function (err, docs) {
    console.log(docs);
    res.json(docs);
    db.close();
  })
   })
  // res.send(req.body)
});

app.get('/man', function (req, res, next) {
 const options = {
  method: 'POST',
  uri: 'https://jsonplaceholder.typicode.com/posts',
  // body : {
  //   hello: "man"
  // }
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
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
