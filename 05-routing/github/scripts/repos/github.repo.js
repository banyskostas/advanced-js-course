(function () {
    angular.module('github')
        .service('githubRepoService', function ($http) {
            let githubRepoService = {};

            let url = 'https://api.github.com/';

            // Private
            githubRepoService.get = function (path) {
                return $http({
                    method: 'GET',
                    url: url + path
                })
            }

            githubRepoService.getUser = function (username) {
                return githubRepoService.get('users/' + username);
            }

            return githubRepoService;
        });
})()

