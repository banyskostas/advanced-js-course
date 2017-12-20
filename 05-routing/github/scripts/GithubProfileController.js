(function() {
    function GithubProfileController($http, $state) {
        var self = this
        this.searchUsername = ''
        this.user = null
        this.files = null

        this.searchUser = function() {
            $state.go('userProfile', { username: this.searchUsername })
        }

        this.showFiles = function(repo) {
            $state.go('repoFiles', { username: self.user.login, repo: repo.name })
            $http({
                method: 'GET',
                url: repo.filesUrl
            }).then(function(response) {
                self.user = null
                self.files = response.data
                    .map(function(f) {
                        return {
                            name: f.name,
                            type: f.type,
                        }
                    })
            })
        }
    }

    angular.module('github')
        .controller('GithubProfileController', GithubProfileController)
})()
