const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controllers/blog');
const { SuccessModel, FailModel } = require('../models/resModel');

const blogHandle = (req, res) => {
  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.author || '';

    return getBlogList(author, keyword).then((listData) => {
      const res = JSON.parse(JSON.stringify(listData));
      console.log(res);

      return new SuccessModel(res);
    });
  }

  // 获取一篇博客的内容
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id || '';
    const detailData = getBlogDetail(id);
    return new SuccessModel(detailData);
  }

  // 新增一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    const postData = req.body;
    const newBlogData = newBlog(postData);
    return new SuccessModel(newBlogData);
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const id = req.query.id || '';
    const postData = req.body;
    const updateBlogData = updateBlog(id, postData);
    return new SuccessModel(updateBlogData);
  }

  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const id = req.query.id || '';
    const deleteBlogData = deleteBlog(id);
    return new SuccessModel(deleteBlogData);
  }
};

module.exports = blogHandle;
