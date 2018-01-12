import * as angular from 'angular'
import { JobsController } from './jobs/JobsController'
import { JobEditController } from './jobs/JobEditController'
import '@uirouter/angularjs'
import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs'
import domready = require('domready')

angular.module('app', ['ui.router'])
    .controller('JobsController', JobsController)
    .controller('JobEditController', JobEditController)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) => {
        $stateProvider.state({
            name: 'jobslist',
            url: '/jobs',
            templateUrl: '/app/jobs/list.html',
            controller: 'JobsController as jobs'
        })

        $stateProvider.state({
            name: 'jobedit',
            url: '/jobs/:id',
            templateUrl: '/app/jobs/edit.html',
            controller: 'JobEditController as job'
        })

        $urlRouterProvider.otherwise('/jobs')
    }])

domready(() => {
    angular.bootstrap(document, ['app'])
})
