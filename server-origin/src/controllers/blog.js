// 获取博客列表
const getBlogList = (author, keyword) => {
  return [
    { title: 'A', date: '2020-02-22', author: 'A', id: '1' },
    { title: 'B', date: '2020-02-22', author: 'B', id: '2' },
  ];
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
