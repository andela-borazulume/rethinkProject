angular./**
*  Module
*
* Description
*/
angular.module('app', []).
	directive('datePicker', ['$locale', function ($locale) {
		return {
			restrict: 'AE',
			controller: function($scope, $timeout, $filter) {
				var days = [];
				var daysOfWeek = [];
				var months = [];
				var year = [];
				var firstDayOfWeek = $locale.DATETIME_FORMATS.FIRSTDAYOFWEEK || 0;

				for(var i = 0; i <= 31; i++) {
					days.push(i);
				}
				for(var i = 0; i < 7; i++) {
					daysOfWeek.push(i);
				}

			}
		};
	}])