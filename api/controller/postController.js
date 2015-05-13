var Posts = require('../model/postModel');
var _ = require('lodash');

exports.getAllPost = function(req, res) {
	Posts.run().then(function(data) {
		res.json(data);
	}).error(function(err) {
		res.status(400).json(err);
	});
};

exports.create = function(req, res) {
	var posts = new Posts(req.body);
	posts.saveAll().then(function(data) {
		res.json(data);
	}).error(function(err) {
		res.status(400).json(err);
	});
};

exports.getPostById = function(req, res, err) {
	if(req.post) {
		res.json(req.post);
	}
	else {
		res.status(400).json(err);
	}
};

exports.update = function(req, res) {
	var post = req.post;
	 post = _.extend(post, req.body);
	post.saveAll().then(function(post) {
		res.json(post);
	}).error(function(err) {
		res.status(400).json(err);
	});
};

exports.delete = function(req, res) {
	var post = req.post;
	post.deleteAll().then(function(post){
		res.json(post);
	}).error(function(err) {
		res.status(400).json(err);
	});
};

exports.postById = function(req, res, next, id) {
	Posts.get(id).getJoin().run().then(function(post) {
		req.post = post;
		next();
	}).error(function(err) {
		req.status(400).send('Error has occured');
	});

};
