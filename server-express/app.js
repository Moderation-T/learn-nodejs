const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// 自动生成日志的插件
const logger = require('morgan');

// 引入路由
const blogRouter = require('./routes/blog');

const app = express();

// view engine setup 视图引擎的设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
// 类似于 getPostData 得到 req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 经过这里处理之后 就自动处理好 cookie 了
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/api/blog', blogRouter);

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



