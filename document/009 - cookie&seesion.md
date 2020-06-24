核心：登陆校验&登陆信息存储

- 什么是 cookie

  > 存储在浏览器的一段字符串
  > 跨域不共享
  > 格式：k1=v1;k2=v2;因此可以结构化数据
  > 每次发送 HTTP 请求，会将请求域的 cookie 一起发给 server
  > server 端可以修改 cookie 并返回给浏览器
  > 浏览器也可以通过 js 修改 cookie（有限制 ）

- js 操作 cookie，浏览器中查看 cookie

  > 浏览器查看 cookie ： response header 中查看；application cookie 中查看；console 输入 document.cookies 查看
  > 修改 document.cookie = 'k3=v3;'

- server 端操作 cookie，实现登陆验证
  > 查看 cookie：req.headers.cookie
  > 修改 cookie：`res.setHeader('Set-Cookie','username=${data.username}'; path=/;httpOnly;expires=date GMT)`

```js
//  实现登陆验证
/*
1. 客户端上传用户密码
2. server 端设置 cookie
3. 通过cookie中是否存在 username 判断登陆是否有效 进行登陆验证
*/

res.setHeader('Set-Cookie','username=${data.username}'; path=/;httpOnly)
/*
  path=/ 允许所有路由访问
  httpOnly 只允许 server 端修改
  获取 cookie 主要要去除空格
  expires 设置过期时间
  GMT 一个时间格式 toGMTString()
*/
```

> 存在的问题：会暴露 username 很危险
> 解决方案：cookie 中存储 userid，server 端对应 username
> 解决方案：session，即 server 端存储用户信息

- session 的实现：

```js
// 解析 session
let needSetCookie = false;
let userId = req.cookie.userid;
if (userId) {
  if (!SESSION_DATA[userId]) {
    SESSION_DATA[userId] = {};
  }
} else {
  needSetCookie = true;
  userId = `${Date.now()}_${Math.random()}`;
  SESSION_DATA[userId] = {};
}
req.session = SESSION_DATA[userId];

/* 
SESSION_DATA:{userId:{username,realname}}
*/
```

- session 模式的局限：
  > 限制进程的最大可用内存
  > 正式上线分为多个进程来跑 无法共享

* session 模式解决方案 redis

  > web server 最常用的缓存数据库，数据存放在内存中
  > 相比 MySQL 访问速度快
  > 成本更高，可存储数据量小

  > 将 web server 和 redis 拆分成两个单独的服务
  > 双方都是独立的，都是可扩展的
  > MySQL 也是一个单独的服务 可扩展

  > session 为何使用 redis：
  > session 的访问频繁，对性能要求极高
  > session 可以不考虑断电丢失数据的问题
  > session 的数据量不会很大

  > 网站数据为何不适用 redis
  > 操作频率不是太高
  > 断电不能丢失，必须保留
  > 数据量太大，内存成本太高


