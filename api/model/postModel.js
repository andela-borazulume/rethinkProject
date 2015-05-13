 var thinky = require('../../config/thinky');
 var type = thinky.type;
 var Comments = require('./commentModel');
 var _ = require('lodash');

 var Post = thinky.createModel('Post', {
 	id: String,
 	content: String,
 	dateCreated: {
 		_type: Number,
 		default: function() {
 			return Date.now()
 		}
 	}
 });

 Post.hasMany(Comments, 'comments', 'id', 'post_id');

 module.exports = Post;