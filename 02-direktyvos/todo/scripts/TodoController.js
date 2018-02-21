"use strict";
(function () {
    angular.module('todo')
        .controller('TodoController', function ($scope) {
            $scope.todoList = [];
            $scope.task = '';

            $scope.issaugoti = function () {
                console.log($scope.task);
                console.log('hello?');


                $scope.todoList.push({done: false, task: $scope.task})
            }

            /**
             *
             * @link http://google.lt/ ...
             *
             * TODO implement 3rd party api
             *
             * @param {int|string} variable
             * @returns {int|string}
             */
            $scope.always = function (variable) {
                return variable;
            }

            $scope.isNotDone = function (item) {

                // TODO change this
                return !item.done
            }

            $scope.isDone = function (item) {
                return item.done
            }

            $scope.countNotDone = function () {
                var count = 0;
                for (var i = 0; i < $scope.todoList.length; i++) {
                    if (!$scope.todoList[i].done) {
                        count++;
                    }
                }
                return count;
            }

            $scope.currentFilter = $scope.always;

            $scope.showAll = function () {
                $scope.currentFilter = $scope.always
            }

            $scope.showActive = function () {
                $scope.currentFilter = $scope.isNotDone
            }

            $scope.showCompleted = function () {
                $scope.currentFilter = $scope.isDone
            }
        });
})();
