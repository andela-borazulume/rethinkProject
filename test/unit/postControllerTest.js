describe('Posts Controller', function() {
    var scope, controller;

    beforeEach(angular.module('app'));

    beforeEach(angular.inject(function($rootScope, $controller){
        // $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        controller = $controller;

        // $controller = $controller('PostsCrtl', {'$rootScope' : $rootScope, '$scope': $scope});
    }));

    it('should exist', function() {
        controller('PostsCrtl', {'$scope': scope});
        expect(controller).toBeDefined();
    });
});