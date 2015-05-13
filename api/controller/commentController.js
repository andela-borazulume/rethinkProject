var Comments = require('../model/commentModel');
var _ = require('lodash');


exports.getAllComment = function(req, res) {
	Comments.run().then(function(data) {
		res.json(data);

	}).error(function(err) {
		res.status(400).json(err);
	});
};

exports.getOneComment = function(req, res, err){
	if(req.comment){
		res.json(req.comment);
	}
	else {
		res.status(400).json(err);
	}
};

exports.create = function(req, res) { console.log(req.body);
	var comments = new Comments(req.body);
	comments.saveAll().then(function(data) {
		res.json(data);
	}).error(function(err) {
		res.status(400).json(err);
	});

};

exports.delete = function(req, res) {
	var comment = req.comment;
	comment.deleteAll().then(function(data) {
		res.json(data);
	}).error(function(err) {
		res.status(400).json(err);
	});

};

exports.update = function(req, res) {
	var comment = req.comment;
	comment = _.extend(comment, req.body);
	comment.saveAll().then(function(data) {
		res.json(data);
	}).error(function(err) {
		res.status(400).json(err);
	}); 
};


exports.commentById = function(req, res, next, id) {
	Comments.get(id).run().then(function(comment) {
		req.comment = comment;		
		next();
	}).error(function(err) {
    res.status(500).send('Error has occured');
	});
};

