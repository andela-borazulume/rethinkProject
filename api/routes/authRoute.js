var auth = require('../controller/authController');

module.exports = function(app, config) {
	app.route('/auth/signup')
		.post(auth.signup);

	app.route('/auth/login')
		.post();

	app.route('/auth/logout')
		.get();

	app.route('/auth/create_token')
		.post(auth.createToken);
};
