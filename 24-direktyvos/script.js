angular.module('app', [])
    .controller('MainController', function($scope) {
        $scope.user1 = {
            name: 'Vytautas',
            email: 'vytautas-mackonis@gmail.com',
            address: {
                city: 'Vilnius',
                street: 'Savanoriu pr.',
                house: '6',
                flat: '21'
            }
        }
        $scope.user2 = {
            name: 'Juozas',
            email: 'vytautas-mackonis@gmail.com',
            address: {
                city: 'Vilnius',
                street: 'Savanoriu pr.',
                house: '6',
                flat: '21'
            }
        }
    })
    .directive('btUserProfile', function() {
        return {
            templateUrl: 'user-profile.html',
            scope: {
                user: '='
            },
            controller: function($scope) {
                $scope.like = function() {
                    $scope.liked = true
                }

                $scope.unlike = function() {
                    $scope.liked = false
                }
            },
        }
    })
