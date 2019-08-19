var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getDataRouter = require('./routes/getData');
var trendDataRouter = require('./routes/getTrendData');
var getDistrictRpt = require('./routes/getDistrictRpt');
var webUploader = require('./routes/webUploader');
var simulateReq = require('./routes/simulateReq');
var kpGetData = require('./routes/kpGetData');
var config = require('./kaipu-tongji-config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express); // 设置视图引擎后缀，为.html
app.set('view engine', 'html'); // 设置视图引擎为html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', getDataRouter);
app.use('/trend', trendDataRouter);
app.use('/district', getDistrictRpt);
app.use('/webuploader', webUploader);
app.use('/simulateReq', simulateReq);
app.use('/kaipu-data', kpGetData);

app.use('/baidu-tongji', function (req, res) {
  res.render('baiduTongji')
})
app.use('/kaipu-tongji', function (req, res) {
  res.render('kaipuTongji')
})
// for (var i = 0; i < 100000; i++) {
//   app.use('/test/' + i, function (req, res) {
//     res.render('test', { title: 'Test' });
//   })
// }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
