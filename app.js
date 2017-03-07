require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var app = express();

//global.db = mongoose.connect("mongodb://localhost:27017/Voluncare");

// 下边这里也加上 use(multer())
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');

var session = require('express-session');

app.use(session({//session持久化配置
  secret: "kvkenssecret",
  key: "kvkenskey",
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//超时时间
  resave: false,
    saveUninitialized: true
}));

app.use(function(req,res,next){ 
    res.locals.user = req.session.user;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){ 
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.engine("html",require("ejs").__express);
//app.set('view engine', 'ejs');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(express.static(path.join(__dirname, 'bower_components')));
var routesApi = require('./app_api/routes/index');
var passport = require('passport');
require('./app_api/config/passport');

app.use(passport.initialize());
//app.use('/', routes);
app.use('/api', routesApi);
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
app.use(function(err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
        res.status(401);
        res.json({ message: err.name + ":" + err.message });
    }
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
