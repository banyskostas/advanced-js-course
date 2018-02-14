angular.module('app')
    .controller('todoController', function($scope) {
        $scope.tasks = [];

        $scope.add = function() {
            $scope.tasks.push($scope.title);
        };
        $scope.delete = function(key) {
            $scope.tasks.splice(keyx, 1);
        };
    });