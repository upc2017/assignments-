var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Image Browsing' });
});
router.get('/list',function (req,res,next){
  res.render('list')
})
module.exports = router;
