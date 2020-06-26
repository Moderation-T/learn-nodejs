const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controllers/blog');
const { SuccessModel, FailModel } = require('../models/resModel');

// 统一的登陆验证

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new FailModel('尚未登陆'));
  }
};

const blogHandle = (req, res) => {
  const id = req.query.id || '';
  const postData = req.body;
  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';

    return getBlogList(author, keyword).then((listData) => {
      const res = JSON.parse(JSON.stringify(listData));

      return new SuccessModel(res);
    });
  }

  // 获取一篇博客的内容
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    return getBlogDetail(id).then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  // 新增一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    console.log('new blog');
    console.log(req.session);

    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return newBlog(postData).then((newBlogData) => {
      return new SuccessModel(newBlogData);
    });
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    return updateBlog(id, postData).then((updateBlogData) => {
      return new SuccessModel(updateBlogData);
    });
  }

  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      return loginCheckResult;
    }

    const author = req.session.username;
    return deleteBlog(id, author).then((deleteBlogData) => {
      return new SuccessModel(deleteBlogData);
    });
  }
};

module.exports = blogHandle;
