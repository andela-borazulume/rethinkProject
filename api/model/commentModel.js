var thinky = require('../../config/thinky');
var type = thinky.type;

var Comments = thinky.createModel('Comments', {
	id: String,
	body: String,
	post_id: String
});

module.exports = Comments;