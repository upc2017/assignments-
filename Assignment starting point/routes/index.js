var express = require('express');
var Document = require('../models/Documents')
var router = express.Router();
var List = require('../controllers/List');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Image Browsing'
	});
});
router.get('/list', function(req, res, next) {
	res.render('list')
})


router.post('/list/add', List.insert)

module.exports = router;
