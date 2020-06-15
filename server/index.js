const http = require('http');
const queryString = require('querystring');

// 创建一个服务
const server = http.createServer((req, res) => {
  // req.method 判断前端是用什么方法进行请求的 GET POST PUT ...
  if (req.method === 'GET') {
    // 获取 URL
    const url = req.url;
    // console.log('query', url.split('?')[1]); // a=100&b=200
    req.query = queryString.parse(url.split('?')[1]); // { a: '100', b: '200' }
    // console.log(req.query); // { a: '100', b: '200' }

    // 结束了 返回一个 hi nodejs 字符串给前端
    res.end('here is get method');
  }

  if (req.method === 'POST') {
    console.log('content-Type', req.headers['content-type']);
    let postData = '';

    // 接收数据
    req.on('data', (chunk) => {
      console.log(chunk);

      postData += chunk.toString();
    });

    req.on('end', () => {
      console.log('end post data', postData);
      res.end(postData);
    });
  }
});

// 设置监听端口 3000
server.listen(3000);
