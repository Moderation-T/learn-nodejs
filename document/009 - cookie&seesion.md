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
