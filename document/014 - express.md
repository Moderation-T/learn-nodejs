- express 脚手架
  `yarn global express-generator`

* express-session & redis & connect-redisredis & connect-redis

```js
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

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
```

- morgan
  > access log 记录，直接使用脚手架推荐的 morgan

```js
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'src', 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a',
  });
  app.use(
    logger('combined', {
      stream: writeStream,
    })
  );
}
```
