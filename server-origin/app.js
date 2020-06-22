const querystring = require('querystring');
const blogHandle = require('./src/routers/blogHandle');
const userHandle = require('./src/routers/userHandle');

// 使用 Promise 处理 postData
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
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
  });
};

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // 先获取 postData 的值放到 req.body 中去，然后里边的路由就可以从 req.body 中获取 post data 的值了
  getPostData(req).then((postData) => {
    req.body = postData;

    blogHandle(req, res).then((blogData) => {
      if (blogData) {
        res.end(JSON.stringify(blogData));
        return;
      }
    });

    userHandle(req, res).then((userData) => {
      if (userData) {
        res.end(JSON.stringify(userData));
        return;
      }
    });

    // 找不到路由的处理
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  });
};

module.exports = serverHandle;
