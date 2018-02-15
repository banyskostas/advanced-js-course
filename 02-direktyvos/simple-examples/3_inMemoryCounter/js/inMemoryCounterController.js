angular.module('app')
    .controller('inMemoryCounterController', function($scope) {
        $scope.counter = 0;

        $scope.decrement = function() {
            $scope.counter--;
        };
    });