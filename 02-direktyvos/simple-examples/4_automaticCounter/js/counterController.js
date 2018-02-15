angular.module('app')
    .controller('CounterController', function($scope, $timeout) {
        $scope.counter = 0;
        var updateCounter = function() {
            $scope.counter++;
            $timeout(updateCounter, 1000);
        };
        updateCounter();
    });