var postController = require('../controller/postController');
var S3FS = require('s3fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();


module.exports = function(app, config) {
	app.route('/posts')
		.get(postController.getAllPost)
		.post(postController.create);

	app.route('/posts/:post_id')
		.get(postController.getPostById)
		.put(postController.update)
		.delete(postController.delete);

	app.param('post_id', postController.postById);
};