(function () {
    angular.module('github')
        .directive('colorTextDirective', function () {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    console.log(attrs);
                }
            };
        });
}());