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

  sql += `order by createitem desc`;

  return exec(sql);
};

// 获取一篇博客的内容

const getBlogDetail = (id) => {
  return { title: 'A', date: '2020-02-22', author: 'A', id: '1' };
};

// 新增一条博客 接收 post 上来的数据 向数据库中插入一条信息
const newBlog = (postData) => {
  return postData;
};

// 更新一条博客 接收 post 上来的数据 更新数据库中信息
const updateBlog = (id, postData) => {
  return { id, ...postData };
};

// 删除一条博客 从数据库删除相应 id 的博客
const deleteBlog = (id) => {
  return { id };
};

module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  deleteBlog,
};
