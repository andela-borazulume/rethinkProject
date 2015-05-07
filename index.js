var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var r  = require('rethinkdb');
var routes = require('./api/routes');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var thinky = require('./config/thinky');
var _ = require('lodash');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

thinky.r.connect(config.rethinkdb);

var port = process.env.PORT || 2525;
routes(app, config);

app.listen(port);
console.log('Listening to port '+port);

module.exports = app;
