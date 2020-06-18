const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/database');

// 创建连接对爱那个
const connection = mysql.createConnection(MYSQL_CONF);

// 开始连接
connection.connect();

// 创建统一处理 SQL 的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = { exec };
