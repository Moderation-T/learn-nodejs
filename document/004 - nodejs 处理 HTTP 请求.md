- GET 请求

  > get 请求，即哭护短要向 server 端获取数据，如查询博客列表，通过 querystring 来传递数据，如 a.html?a=100&b=200,浏览器直接访问，返送 get 请求

- POST 请求
  > post 请求，客户端要向服务端传递数据，如新建博客

```js
const http = require('http');
const queryString = require('querystring');

// 创建一个服务
const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json'); // 设置 res.end()返回的字符串的类型是怎么样的 设置返回格式为 json

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
      res.end(postData); // postData 格式是 string
    });
  }
});

// 设置监听端口 3000
server.listen(3000);
```
