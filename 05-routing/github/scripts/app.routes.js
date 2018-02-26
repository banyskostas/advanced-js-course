(function () {
    'use strict';

    angular
        .module('github')
        .config(['$stateProvider', routes]);

    // routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
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

    }
})();