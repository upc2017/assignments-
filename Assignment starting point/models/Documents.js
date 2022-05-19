const {
	Schema,
	default: mongoose
} = require("mongoose");

const documentSchema = new Schema({
	creat_name: String,
	creat_title: String,
	creat_Details: String,
	time: {
		type: Date,
		default: Date.now
	},
	creat_image_url: String
});

// Define database schema
const Documents = mongoose.model('Documents', documentSchema);
// console.log(mongoose);

module.exports = Documents
