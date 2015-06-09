var comments = require('./commentRoute');
var posts = require('./postRoute');
var users = require('./userRoute');
var auth = require('./authRoute');

module.exports = function(app, config) {
	comments(app, config);
	posts(app, config);
	users(app, config);
	auth(app, config);

	app.get('/*', function(req, res) {
		res.sendFile('index.html', {root: './public'});
	});
};