(function () {
    angular.module('github')
        .directive('colorTextDirective', ['githubRepoService', '$rootScope', function (githubRepoService, $rootScope) {
            return {
                restrict: 'A',
                templateUrl: 'scripts/directives/html/colorText.html',
                transclude: true,
                scope: {
                    colorVar: '=color'
                },
                link: function (scope, element, attrs) {
                    console.log(scope.$parent);
                    // console.log(attrs);
                    // console.log(githubRepoService);
                    // console.log(element);
                    // element[0].style.color = attrs.color;
                    scope.data = {};
                    scope.data.color =  scope.colorVar.color;
                    //
                    // $scope.$on('user-loaded', function(e, data) {
                    //     console.log(data.user);
                    // });

                }
            };
        }]);
}());