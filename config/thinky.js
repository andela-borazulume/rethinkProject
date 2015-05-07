var config = require('./config');
var env = process.env.NODE_ENV || 'development';
var thinky = require('thinky')(config[env].rethinkdb);

module.exports = thinky;