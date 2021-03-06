var express = require('express');
var Document = require('../models/Documents')
var router = express.Router();
var List = require('../controllers/List');

/* GET home page. */
router.get('/index', function(req, res, next) {
	res.render('index', {
		title: 'Image Browsing'
	});
});
router.get('/', function(req, res, next) {
	res.render('list')
})


router
	.post('/list/add', List.insert)

router.get('/list', List.list)

module.exports = router;
