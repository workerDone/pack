
let app = require('./settings');

let config = require('config');

let indexRouter = require('./routes/index');
const request = require('request-promise');

let error = require('./routes/error');
let registration = require('./routes/registration');
let login = require('./routes/login');
let find = require('./routes/find');


app.use('/', indexRouter)
app.use('/registration', registration);
app.use('/login', login);
app.use('/find', find )

app.use('*', error);

module.exports = app;
