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

- 中间件

  > 分析中间件使用：
  > app.use 用来注册中间件，先收集起来
  > 遇到 HTTP 请求，根据 path 和 method 来判断触发哪些
  > 实现 next 机制，即上一个通过 next 触发下一个

  > 代码实现

```js
const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 存放中间件的列表
    this.routes = {
      all: [], // app.use(...)
      get: [], // app.get(...)
      post: [], // app.post(...)
    };
  }

  register(path) {
    // 处理第一个参数
    const info = {};
    if (typeof path === 'string') {
      info.path = path;
      // 从第二个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 1);
    } else {
      // 如果第一个参数不是string 就是根目录 都会触发
      info.path = '/';
      // 从第一个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];
    if (url === '/favicon.ico') {
      return stack;
    }

    // 获取 routes
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);

    curRoutes.forEach((routeInfo) => {
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInfo.path === '/'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
        stack = stack.concat(routeInfo.stack);
      }
    });
    return stack;
  }

  // 核心的 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift();
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next);
      }
    };
    next();
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(data));
      };
      const url = req.url;
      const method = req.method.toLowerCase();

      const resultList = this.match(method, url);
      this.handle(req, res, resultList);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress();
};
```
