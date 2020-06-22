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
  console.log('update sql', sql);

  // return exec(sql);
  return exec(sql)
    .then((updateData) => {
      console.log('exec updateData', updateData);

      if (updateData.affectedRows > 0) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
    });
};

// 删除一条博客 从数据库删除相应 id 的博客
const deleteBlog = (id) => {
  const sql = `delete from blogs where id=${id}`;
  console.log(sql);

  return exec(sql).then((deleteData) => {
    console.log(deleteData);

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
