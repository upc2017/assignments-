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
