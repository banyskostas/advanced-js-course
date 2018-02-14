angular.module('app')
    .controller('AddNumbersController', function ($scope) {
        // Predefined variables
        $scope.a = 0;
        $scope.b = 0;

        $scope.AddNumbers = function () {
            var a = Number($scope.a);
            var b = Number($scope.b);
            $scope.sum = a + b;
        }
    });