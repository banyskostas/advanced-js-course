(function () {
    'use strict';

    angular
        .module('github')
        .config(['$stateProvider', '$locationProvider', routes]);

    // routes.$inject = ['$stateProvider', '$locationProvider'];

    function routes($stateProvider,$locationProvider) {
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