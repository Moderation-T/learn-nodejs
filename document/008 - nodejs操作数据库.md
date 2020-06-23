- nodejs 连接数据库报错 原因是 mysql8.0 以上加密方式，Node 还不支持。
  报错[SELECT ERROR] - ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

- 解决方法

```
mysql> alter user 'root'@'localhost' identified with mysql_native_password by 'root123456';
Query OK, 0 rows affected (0.27 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.08 sec)
```

- 操作数据库

```js
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
```

```js
const { exec } = require('../database/mysql');

// 获取博客列表 支持 author 与 keyword 的筛选
const getBlogList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1 ';

  if (author) {
    sql += `and author=${author}`;
  }
  // keyword 是支持模糊查询 title 的关键字
  if (keyword) {
    sql += `and keyword like %${keyword}%`;
  }

  sql += `order by createtime desc`;

  return exec(sql);
};

// 获取一篇博客的内容

const getBlogDetail = (id) => {
  const sql = `select * from blogs where id=${id}`;

  return exec(sql);
};

// 新增一条博客 接收 post 上来的数据 向数据库中插入一条信息
const newBlog = (postData) => {
  const sql = `insert into blogs (title,content,createtime,author) values ('${postData.title}','${postData.content}','${postData.createtime}','${postData.author}')`;

  return exec(sql).then((insertData) => {
    return {
      id: insertData.insertId,
    };
  });
};

// 更新一条博客 接收 post 上来的数据 更新数据库中信息
const updateBlog = (id, postData) => {
  const sql = `update blogs set title='${postData.title}',content='${postData.content}',createtime=${postData.createtime},author='${postData.author}' where id=${id}`;

  // return exec(sql);
  return exec(sql).then((updateData) => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

// 删除一条博客 从数据库删除相应 id 的博客
const deleteBlog = (id) => {
  const sql = `delete from blogs where id=${id}`;

  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
```
