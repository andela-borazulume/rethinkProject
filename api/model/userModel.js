var thinky = require('../../config/thinky');
var type = thinky.type;

var Users = thinky.createModel('Users', {
	id: String,
	name: String,
	email: String,
	password: String
});
module.exports = Users;