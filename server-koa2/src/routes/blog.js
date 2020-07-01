const router = require('koa-router')();
const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controllers/blog');
const loginCheck = require('../middleware/loginCheck');
const { SuccessModel, FailModel } = require('../models/resModel');

router.prefix('/api/blog');

// 获取博客列表
router.get('/list', async (ctx, next) => {
  const author = ctx.query.author || '';
  const keyword = ctx.query.keyword || '';

  const listData = await getBlogList(author, keyword);

  ctx.body = new SuccessModel(listData);
});

// 获取单个博客信息
router.get('/detail', async (ctx, next) => {
  const detailData = await getBlogDetail(ctx.query.id);
  ctx.body = new SuccessModel(detailData);
});

router.post('/new', async (ctx, next) => {
  const postData = ctx.request.body;

  const newBlogData = await newBlog(postData);
  ctx.body = new SuccessModel(newBlogData);
});

module.exports = router;
