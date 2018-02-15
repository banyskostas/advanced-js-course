angular.module('app')
    .controller('CounterController', function($scope, $timeout, $interval) {
        $scope.counter = 0;

        var updateCounter = function() {
            $scope.counter++;
            $timeout(updateCounter, 1000);
        };
        updateCounter();

        // $timeout(function() {
        //     $scope.counter += 10;
        // }, 3000);
        //
        // $interval(function() {
        //     updateCounter();
        // }, 1000);
    });