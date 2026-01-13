require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoSession = require('connect-mongodb-session')(session);


const port = process.env.PORT || 3000;

const app = express();
//connect DB
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoSession({
  uri: process.env.MONGO_URI,
  collection: 'users'
});

app.use(session({
  secret: 'testingsecretforcoursevalidation',
  resave: false,
  saveUninitialized: true,
  store: store,
}))


// Router configurations
app.use('/', require('./routes/index'));
// app.use('/users', usersRouter);
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/notes', require('./routes/notes'));
// app.use('/add-note', require('./routes/add-note'));

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

app.listen(port, () => console.log(`Listning on port ${port}`))

