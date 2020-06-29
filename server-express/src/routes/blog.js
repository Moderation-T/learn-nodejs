var express = require('express');
var router = express.Router();
const { getBlogList, getBlogDetail, newBlog, updateBlog, deleteBlog } = require('../controllers/blog');
const { SuccessModel, FailModel } = require('../models/resModel');

/* GET home page. */
// 获取博客列表
router.get('/list', function (req, res, next) {
  const author = req.query.author || '';
  const keyword = req.query.keyword || '';

  return getBlogList(author, keyword).then((listData) => {
    console.log('getBlogList is ', listData);

    listData = JSON.parse(JSON.stringify(listData));
    res.json(new SuccessModel(listData));
  });
});

// 获取单个博客信息
router.get('/detail', function (req, res, next) {
  return getBlogDetail(req.query.id).then((detailData) => {
    res.json(new SuccessModel(detailData));
  });
});

module.exports = router;
