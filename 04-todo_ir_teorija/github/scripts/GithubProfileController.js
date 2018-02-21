(function() {
    function GithubProfileController($http) {
        var self = this
        $http({
            method: 'GET',
            url: 'https://api.github.com/users/banyskostas'
        }).then(function(response) {
            console.log(response.data);
            self.data = response.data
        })
    }

    angular.module('github')
        .controller('GithubProfileController', GithubProfileController)
})()
