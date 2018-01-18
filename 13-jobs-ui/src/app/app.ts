import * as angular from 'angular'
import { JobsController } from './jobs/JobsController'
import { JobEditController } from './jobs/JobEditController'
import { JobService } from './jobs/JobsService'
import { LoginController } from './auth/LoginController'
import { OauthService } from './auth/OauthService'
import { SecurityContext } from './auth/SecurityContext'
import { TokenValidatingHttpInterceptor } from './auth/TokenValidatingHttpInterceptor'
import '@uirouter/angularjs'
import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs'
import domready = require('domready')

angular.module('app', ['ui.router'])
    .controller('JobsController', JobsController)
    .controller('JobEditController', JobEditController)
    .service('JobService', JobService)
    .controller('LoginController', LoginController)
    .service('OauthService', OauthService)
    .service('SecurityContext', SecurityContext)
    .config(['$httpProvider', ($httpProvider: ng.IHttpProvider) => {
        $httpProvider.interceptors.push(['SecurityContext', '$q', '$state',
            (securityContext: SecurityContext, $state: any) => {
            return new TokenValidatingHttpInterceptor(securityContext, $state)
        }])
    }])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) => {
        $stateProvider.state({
            name: 'jobs'
        })

        $stateProvider.state({
            name: 'jobs.list',
            url: '/jobs',
            templateUrl: '/app/jobs/list.html',
            controller: 'JobsController as jobs'
        })

        $stateProvider.state({
            name: 'jobs.edit',
            url: '/jobs/:id',
            templateUrl: '/app/jobs/edit.html',
            controller: 'JobEditController as job'
        })

        $stateProvider.state({
            name: 'auth'
        })

        $stateProvider.state({
            name: 'auth.login',
            url: '/login',
            templateUrl: '/app/auth/login.html',
            controller: 'LoginController as login'
        })

        $urlRouterProvider.otherwise('/jobs')
    }])

domready(() => {
    angular.bootstrap(document, ['app'])
})
