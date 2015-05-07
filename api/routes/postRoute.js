var postController = require('../controller/postController');

module.exports = function(app, config) {
	app.route('/posts')
	.get(postController.getAllPost)
	.post(postController.create);

	app.route('/posts/:post_id')
	.get(postController.getPostById)
	.put(postController.update)
	.delete(postController.delete);

	// app.route('/posts/:post_id/comments')
	// .get(postController.getCommentsByPostId)
	// .post(postController.createCommentsByPostId);

	app.param('post_id', postController.postById);
};