var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const config = require('./config.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataSeed= require('./dataSeed')
var cors = require('cors')

var app = express();

app.use(cors())

//database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database connected')
  dataSeed.userData()
},
  error => {
    console.log('Database could not be connected : ' + error + config.db)
  }
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);

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
