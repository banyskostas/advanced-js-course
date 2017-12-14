function Labas($scope) {
    $scope.todoList = []

    $scope.issaugoti = function(task) {
        $scope.todoList.push({ done: false, task: task })
    }

    $scope.always = function() {
        return true
    }

    $scope.isNotDone = function(item) {
        return !item.done
    }

    $scope.isDone = function(item) {
        return item.done
    }

    $scope.countNotDone = function() {
        var count = 0;
        for (var i = 0; i < $scope.todoList.length; i++) {
            if (!$scope.todoList[i].done) {
                count++;
            }
        }

        return count
    }

    $scope.currentFilter = $scope.always

    $scope.showAll = function() {
        $scope.currentFilter = $scope.always
    }

    $scope.showActive = function() {
        $scope.currentFilter = $scope.isNotDone
    }

    $scope.showCompleted = function() {
        $scope.currentFilter = $scope.isDone
    }
}

var todoModule = angular.module('todo')
todoModule.controller('TodoController', Labas)
