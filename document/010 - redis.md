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

- redis

  > brew install redis
  > 启动 `redis-server`

- nodejs 连接 redis

```js
const redis = require('redis');

const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', (err) => {
  console.log(err);
});

// 测试
redisClient.set('myname', 'zhangsan2', redis.print);
redisClient.get('myname', (err, val) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('val', val);
});
// 退出
redisClient.quit();
```
