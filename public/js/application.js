// angular.module('app.controller', []);

angular.module('app', [
	'ngRoute',
	'ngResource',
	'ngMaterial',
	'ngAnimate',
	'ngSanitize'
	]).config(['$routeProvider', function($routeProvider) {
		// $locationProvider.html5Mode(true);
		$routeProvider
			.when('/home', {
				templateUrl: 'view/homeView.html',
				controller: 'PostsCrtl'
		  })
		  .when('/posts/:postId', {
		  	templateUrl: 'view/postView.html',
		  	controller: 'PostsCrtl'
		  })
		  .otherwise({
		  	redirectTo: '/'
		  });
	}]);