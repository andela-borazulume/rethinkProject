angular.module('app')
	.factory('Comments', ['$resource', function($resource) {
		return $resource('comments/:comments_id', null, {
			'update': {method: 'PUT'}
		});
}]);