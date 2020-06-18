const env = process.env.NODE_ENV;

let MYSQL_CONF;
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root123456',
    database: 'myblog',
  };
}

if (env === 'production') {
  // 按理说开发环境和生产环境的配置肯定是不一样的 但是现在我们只有开发环境
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root123456',
    database: 'myblog',
  };
}

module.exports = {
  MYSQL_CONF,
};
