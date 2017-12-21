define(['GithubProfileController', 'UserProfileController', 'RepoFilesController'],
    function(GithubProfileController, UserProfileController, RepoFilesController) {
        angular.module('github', ['ui.router'])
            .controller('GithubProfileController', ['$state', GithubProfileController])
            .controller('UserProfileController', UserProfileController)
            .controller('RepoFilesController', RepoFilesController)
            .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
                $stateProvider.state({
                    name: 'root',
                    url: '/',
                    template: ''
                })

                $stateProvider.state({
                    name: 'userProfile',
                    url: '/users/:username/',
                    templateUrl: 'user-profile.html',
                    controller: 'UserProfileController as profile'
                })

                $stateProvider.state({
                    name: 'repoFiles',
                    url: '/users/:username/repos/:repo/files/{path:.*}',
                    templateUrl: 'repo-files.html',
                    controller: 'RepoFilesController as fileList'
                })

                $urlRouterProvider.otherwise('/')
            }])

        angular.bootstrap(document, ['github'])
})
