var Users = require('../model/userModel');
var _ = require('lodash');

module.exports = function(app, config) {
	app.route('/users')
		.get(function(req, res) {
			Users.run().then(function(data) {
				res.json(data);
			}).error(function(err) {
				res.status(500).json(err);
			});
		})
		.post(function(req, res) {
			var users = new Users(req.body);
			users.saveAll().then(function(data) {
				res.json(data);
			}).error(function(err) {
				res.status(500).json(err);
			});
		});

	app.route('/users/:user_id')
		.get(function(req, res, err) {
			if(req.user) {
				res.json(req.user);
			}
			else {
				res.status(400).send('Error has occured');
			}
		})
		.delete(function(req, res) {
			var user = req.user;
			user.deleteAll().then(function(data) {
				res.json(data);
			}).error(function(err) {
				res.status(400).send('Error has occured');
			});
		})
		.put(function(req, res) {
			var user = req.user;
			user = _.extend(user, req.body);
			user.saveAll().then(function(user) {
				res.json(user);
			}).error(function(err) {
				res.status(400).json(err);
			});	
		});

	app.param('user_id', function(req, res, next, id) {
		Users.get(id).run().then(function(data) {
			req.user = data;
			next();
		}).error(function(err) {
			res.status(500).json(err);
		});
	});
};