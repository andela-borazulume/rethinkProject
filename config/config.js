var development = {
	rethinkdb: {
		host: 'localhost',
		port: '28015',
		db: 'testing'
	},
	firebase: {
    rootRefUrl: 'https://rethinkdbtutorial.firebaseio.com/',
    secretKey: 'IZYr55nbkqigSKIzBSW8wivc1HyYzPuis6iMQDen'
  }
};

var config = {
	development: development
};

module.exports = config;