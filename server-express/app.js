const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
// 自动生成日志的插件
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// 引入路由
const blogRouter = require('./src/routes/blog');
const userRouter = require('./src/routes/user');

const app = express();

// view engine setup 视图引擎的设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'src', 'logs', 'access.log');
  console.log(logFileName);

  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a',
  });
  app.use(
    logger('combined', {
      stream: writeStream,
    })
  );
}
// 类似于 getPostData 得到 req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 经过这里处理之后 就自动处理好 cookie 了
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
const redisClient = require('./src/database/redis');
const sessionStore = new RedisStore({
  client: redisClient,
});
app.use(
  session({
    secret: 'Ai434*&244_',
    cookie: {
      // path: '/', // 默认设置
      // httpOnly: true, // 默认设置
      maxAge: 24 * 60 * 60 * 1000, // 有效时间 24h
    },
    store: sessionStore,
  })
);

// 注册路由
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
