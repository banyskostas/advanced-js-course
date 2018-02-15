(function() {
    angular.module('github', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider.state({
                name: 'root',
                url: '/',
                template: ''
            })

            $stateProvider.state({
                name: 'userProfile',
                url: '/users/:username',
                templateUrl: 'user-profile.html',
                controller: 'UserProfileController as profile'
            })

            $stateProvider.state({
                name: 'repoFiles',
                url: '/users/:username/repos/:repo/files',
                templateUrl: 'repo-files.html'
            })
        })
})()
