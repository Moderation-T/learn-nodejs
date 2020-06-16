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

module.exports = {
  getBlogList,
  getBlogDetail,
};
