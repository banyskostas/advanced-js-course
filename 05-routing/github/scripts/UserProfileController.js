(function() {
    function UserProfileController($http, $stateParams, githubRepoService) {
        var self = this

        githubRepoService.getUser($stateParams.username).then(function(response) {
            self.user = {
                avatar: response.data.avatar_url,
                login: response.data.login,
                name: response.data.name,
                company: response.data.company,
                location: response.data.location,
            }

            $http({
                method: 'GET',
                url: response.data.repos_url,
            }).then(function(reposResponse) {
                self.user.repos = reposResponse.data
                    .map(function(r) {
                        return {
                            name: r.name,
                            filesUrl: r.contents_url.substring(0, r.contents_url.length - '{+path}'.length)
                        }
                    })
            })
        })

    }

    angular.module('github')
        .controller('UserProfileController', UserProfileController)
})()
