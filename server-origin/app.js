const blogHandle = require('./src/blogHandle');
const userHandle = require('./src/userHandle');

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];

  const blogData = blogHandle(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }

  const userData = userHandle(req, res);
  if (userData) {
    res.end(JSON.stringify(userData));
    return;
  }

  // 找不到路由的处理
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('404 Not Found');
  res.end();
};

module.exports = serverHandle;
