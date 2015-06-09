angular.module('app')
	.factory('Posts', ['$resource', function($resource) {
		return $resource('posts/:post_id', null, {
			'update': {method: 'PUT'}
		});
}]);