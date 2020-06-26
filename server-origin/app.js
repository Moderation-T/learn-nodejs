const querystring = require('querystring');
const blogHandle = require('./src/routers/blogHandle');
const userHandle = require('./src/routers/userHandle');
const { set, get } = require('./src/database/redis');

// 使用 Promise 处理 postData
const getPostData = (req) => {
  const promise = new Promise((resolve) => {
    // 如果不是 POST 方法 || Content-type = application/json 返回空对象
    if (req.method !== 'POST') {
      resolve({});
      return;
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }

    // 处理 postData
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });

    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });

    // reject('错误');
  });

  return promise;
};

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = querystring.parse(url.split('?')[1]);

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach((element) => {
    if (!element) {
      return;
    }
    const arr = element.split('=');
    // 使用 HttpOnly 的时候，如果不去除空格会出现错误
    req.cookie[arr[0].trim()] = arr[1].trim();
  });

  // 解析 session
  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的 session 值
    set(userId, {});
  }

  req.sessionId = userId;
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData === null) {
        set(req.sessionId, {});
        req.session = {};
      } else {
        req.session = sessionData;
      }

      return getPostData(req);
    })
    .then((postData) => {
      // 先获取 postData 的值放到 req.body 中去，然后里边的路由就可以从 req.body 中获取 post data 的值了
      req.body = postData;

      const blogResult = blogHandle(req, res);

      if (blogResult) {
        blogResult.then((blogData) => {
          if (blogData) {
            res.end(JSON.stringify(blogData));
            return;
          }
        });
      }

      const userResult = userHandle(req, res);

      if (userResult) {
        userResult.then((userData) => {
          if (userData) {
            res.end(JSON.stringify(userData));
            return;
          }
        });
      }

      // 找不到路由的处理
      // res.writeHead(404, { 'Content-type': 'text/plain' });
      // res.write('404 Not Found');
      // res.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = serverHandle;
