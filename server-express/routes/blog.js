var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/list', function (req, res, next) {
  res.json({
    errcode: 0,
    data: [{ title: 'title' }],
  });
});

module.exports = router;
