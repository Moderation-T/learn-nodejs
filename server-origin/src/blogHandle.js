const blogHandle = (req, res) => {
  // 获取博客列表
  if (req.method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: '这是获取博客列表的接口',
    };
  }

  // 获取一篇博客的内容
  if (req.method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '这是获取一篇博客的内容的接口',
    };
  }

  // 新增一篇博客
  if (req.method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '新增一篇博客',
    };
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
