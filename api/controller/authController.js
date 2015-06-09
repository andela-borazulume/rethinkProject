var bcrypt = require('bcryptjs');
var FirebaseTokenGenerator = require('firebase-token-generator');
var User = require('../model/userModel');

var hashPassword = function(password, cb) {
  bcrypt.genSalt(10, function(err, salt) { 
    if(err) cb();
    bcrypt.hash(password, salt, function(err, hash) {
      if(err) cb();
      cb(hash);
    });
  });
};

exports.createToken = function(req, res) {
	var secret = req.body.secretKey;
	var tokenGenerator = new FirebaseTokenGenerator(secret);
	var token = tokenGenerator.cretaToken({uid: req.body.uid, email: req.body.email});
	req.session[req.body.uid] = req.body.uid;
	res.cookie('user', req.body.uid);
	res.status(200).send(token);
};

var createUser = function(req, res, cb, error) {
	console.log('------------', req.body);
	var user = new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email
	});

	hashPassword(user.password, function(hash) {
		user.password = hash;
		if(!user.password) {
			return res.status(400).send('Error has occured');
		}

		user.saveAll().then(function(user) {
			res.json(user);
		}).error(function(err) {
			res.status(400).json(err);
		});
	});
};

exports.signup = function(req, res) {
	var user = new User(req.body);
	user.saveAll().then(function() {
		createUser(req, res, function(user) {
			res.json(user);
		});
	}).error(function(err) {
		res.status(400).json(err);
	});
};
