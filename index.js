var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Firebase = require('firebase');
var r  = require('rethinkdb');
var routes = require('./api/routes');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var thinky = require('./config/thinky');
var _ = require('lodash');
var path = require('path');
var session = require('express-session');
var RDBStore = require('express-session-rethinkdb')(session);

(function run(rootRefUrl) {

	app.use(cookieParser());

	app.use(function(req, res, next) {
		res.cookie('rootRef', rootRefUrl);
		res.cookie('secretKey', config.firebase.secretKey);
		next();
	});
	
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	thinky.r.connect(config.rethinkdb, function(err, conn) {
		thinky.r.db(config.rethinkdb.db).tableCreate('session').run(conn, function() {});
	});

	var rDBStore = new RDBStore({
	  connectOptions: {
	  	db: config.rethinkdb.db,
	    host: config.rethinkdb.host,
	    port: config.rethinkdb.port
	  },
	  table: 'session',
	  sessionTimeout: 86400000,
	  flushInterval: 60000
	});

	var port = process.env.PORT || 2525;
	routes(app, config);

	app.listen(port);
	console.log('Listening to port '+port);
})(process.cwd(), config.firebase.rootRefUrl);


module.exports = app;
