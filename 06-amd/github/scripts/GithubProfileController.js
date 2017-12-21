define(function() {
    function GithubProfileController(state) {
        var self = this
        this.searchUsername = ''

        this.searchUser = function() {
            state.go('userProfile', { username: this.searchUsername })
        }
    }

    return GithubProfileController
})
