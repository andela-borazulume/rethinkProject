var commentController = require('../controller/commentController');

module.exports = function(app, config) {

	app.route('/comments')
			.get(commentController.getAllComment)
			.post(commentController.create);

	app.route('/comments/:commentId')
			.get(commentController.getOneComment)
			.delete(commentController.delete)
			.put(commentController.update);

	app.param('commentId', commentController.commentById);

};

