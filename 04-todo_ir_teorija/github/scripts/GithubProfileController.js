(function() {
    function GithubProfileController($http) {
        var self = this
        $http({
            method: 'GET',
            url: 'https://api.github.com/users/octocat'
        }).then(function(response) {
            self.data = response.data
        })
    }

    angular.module('github')
        .controller('GithubProfileController', GithubProfileController)
})()
