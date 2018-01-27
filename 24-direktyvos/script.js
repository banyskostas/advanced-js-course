angular.module('app', [])
    .controller('MainController', function($scope) {
        $scope.user1 = {
            name: 'Vytautas',
            email: 'vytautas-mackonis@gmail.com',
            friends: [
                'Jonas',
                'Paulius',
                'Aiste'
            ],
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
            friends: [
                'Jonas',
                'Paulius',
                'Aiste'
            ],
            address: {
                city: 'Vilnius',
                street: 'Savanoriu pr.',
                house: '6',
                flat: '21'
            }
        }

        $scope.removeFriend = function(user, friend) {
            var index = user.friends.indexOf(friend)
            user.friends.splice(index, 1)
        }
    })
    .directive('btUserProfile', function() {
        return {
            templateUrl: 'user-profile.html',
            scope: {
                user: '=',
                initialCollapsed: '@collapsed',
                onRemove: '&onFriendRemove'
            },
            controller: function($scope) {
                $scope.collapsed = $scope.initialCollapsed === 'true'

                $scope.collapseProfile = function() {
                    $scope.collapsed = !$scope.collapsed
                }

                $scope.removeFriend = function(friend) {
                    //$scope.onRemove()
                    $scope.onRemove({
                        friend: friend
                    })
                }

                $scope.like = function() {
                    $scope.liked = true
                }

                $scope.unlike = function() {
                    $scope.liked = false
                }
            },
        }
    }).directive('btAddress', function() {
        return {
            templateUrl: 'address.html',
            scope: true,
            controller: function($scope) {
                $scope.collapsed = false

                $scope.collapseAddress = function() {
                    $scope.collapsed = !$scope.collapsed
                }
            }
        }
    })
