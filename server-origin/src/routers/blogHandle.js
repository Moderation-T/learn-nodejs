const { getBlogList, getBlogDetail } = require('../controllers/blog');
const { SuccessModel, FailModel } = require('../models/resModel');

const blogHandle = (req, res) => {
  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.author || '';
    const listData = getBlogList(author, keyword);

    return new SuccessModel(listData);
  }

  // 获取一篇博客的内容
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id || '';
    const detailData = getBlogDetail(id);
    return new SuccessModel(detailData);
  }

  // 新增一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    return { msg: '新增一篇博客' };
  }

  // 更新一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '更新一篇博客',
    };
  }

  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '删除一篇博客',
    };
  }
};

module.exports = blogHandle;
