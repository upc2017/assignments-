let Document = require('../models/Documents');

exports.insert = async function(req, res, next) {
	const storyData = req.body;
	const document = new Document(storyData);
	const newDocument = await document.save();
	if (newDocument === document) {
		res.json({
			code: 1,
			'msg': 'success'
		});
	} else {
		res.json({
			code: -1,
			'msg': 'failed'
		});
	}
}

exports.list = async function(req, res, next) {
	const newDocument = await Document.find();
	res.json({
		code: 1,
		data: newDocument
	});
}
