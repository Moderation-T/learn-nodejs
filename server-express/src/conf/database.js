const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;
if (env === 'dev') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root123456',
    database: 'myblog',
  };
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379,
  };
}

if (env === 'production') {
  // 按理说开发环境和生产环境的配置肯定是不一样的 但是现在我们只有开发环境
  MYSQL_CONF = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root123456',
    database: 'myblog',
  };
  REDIS_CONF = { host: '127.0.0.1', port: 6379 };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
