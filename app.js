var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

require('dotenv').config();


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
app.use(cors());

app.use('/', indexRouter);

// role router
const RoleRouter = require("./routes/v1/roles"); 
app.use("/role", RoleRouter);

// grade router
const GradeRouter = require("./routes/v1/grades"); 
app.use("/grade", GradeRouter);

// user router
const userRouter = require("./routes/v1/users/users");
app.use("/users", userRouter);

// student router
const studentsRoutes = require("./routes/v1/students"); 
app.use("/student", studentsRoutes);

// subject router
const SubjectRouter = require("./routes/v1/subjects"); 
app.use("/subject", SubjectRouter);

// batch router
const batchesRouter = require("./routes/v1/batches"); 
app.use("/batch", batchesRouter);

// event router
const eventsRouter = require("./routes/v1/events"); 
app.use("/event", eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return res.status(404).send({message: "not found"})
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
