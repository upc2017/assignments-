let Document = require('../models/Documents');

exports.insert = async function(req, res, next) {
	/* #swagger.description = 'Insert story into mongodb'
	#swagger.responses[200] = {
			description: 'Insert story successfully.',
			schema: { code:1, msg: 'success'}
		}
	* */

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
	/* #swagger.description = 'Insert story into mongodb'
	#swagger.responses[200] = {
			description: 'Insert story successfully.',
			schema: { code:1, data: [  { $ref: '#/definitions/Document' }]}
		}
	* */
	const newDocument = await Document.find();
	res.json({
		code: 1,
		data: newDocument
	});
}
