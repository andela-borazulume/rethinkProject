var comments = require('./commentRoute');
var posts = require('./postRoute');

module.exports = function(app, config) {
	comments(app, config);
	posts(app, config);
};