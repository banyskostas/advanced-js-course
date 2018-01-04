export function UserProfileController(http, stateParams) {
    var self = this
    this.user = null

    http({
        method: 'GET',
        url: 'https://api.github.com/users/' + stateParams.username
    }).then(function(response) {
        self.user = {
            avatar: response.data.avatar_url,
            login: response.data.login,
            name: response.data.name,
            company: response.data.company,
            location: response.data.location,
        }

        http({
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

UserProfileController.$inject = ['$http', '$stateParams']
