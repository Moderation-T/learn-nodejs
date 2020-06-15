const http = require('http');

// 创建一个服务
const server = http.createServer((req, res) => {
  // 结束了 返回一个 hi nodejs 字符串给前端
  res.end('hi nodejs');
});

// 设置监听端口 3000
server.listen(3000);
