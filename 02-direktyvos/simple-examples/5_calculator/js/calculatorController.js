angular.module('app')
    .controller('CalculatorController', function($scope) {
        $scope.result = function() {
            if ($scope.operator == '+') {
                return $scope.a + $scope.b;
            }
            if ($scope.operator == '-') {
                return $scope.a - $scope.b;
            }
            if ($scope.operator == '*') {
                return $scope.a * $scope.b;
            }
            if ($scope.operator == '/') {
                return $scope.a / $scope.b;
            }

            // return $scope.a + $scope.operator +  $scope.b;
        };
    });