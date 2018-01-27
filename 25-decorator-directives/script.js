angular.module('app', [])
    .controller('MainController', function($scope) {
        $scope.value = 0
        $scope.fontScale = 150

        $scope.increment = function(value) {
            evt.preventDefault()
            $scope.value++
        }

        $scope.decrement = function() {
            $scope.value--
        }
    }).directive('btMakeRed', function() {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.on('click', function() {
                    el.css('background', 'red')
                })
            }
        }
    }).directive('btDatepicker', function() {
        return {
            restrict: 'A',
            link: function(scope, el) {
                new Pikaday({ field: el[0] })
            }
        }
    }).directive('btIncrement', function() {
        return {
            restrict: 'A',
            link: function(scope, el) {
                el.on('click', function() {
                    console.log('clicking', scope)
                    scope.$apply(function() {
                        scope.value++
                    })
                })
            }
        }
    })
    /*
    .directive('btClick', function() {
        return {
            restrict: 'A',
            scope: {
                clicked: '&btClick'
            },
            link: function(scope, el, attrs) {
                el.on('click', function() {
                    scope.clicked()
                    scope.$apply()
                })
            }
        }
    })*/
    .directive('btClick', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.on('click', function(clickEvent) {
                    var clickFunction = $parse(attrs.btClick)
                    clickFunction(scope, {
                        evt: clickEvent
                    })
                    scope.$apply()
                })
            }
        }
    }).directive('btFontScale', function() {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                scope.$watch(attrs.btFontScale, function(newValue, oldValue) {
                    console.log('Changed from ', oldValue, ' to ', newValue)
                    el.css('font-size', newValue + '%')
                })
            }
        }
    })
