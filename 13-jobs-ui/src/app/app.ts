import * as angular from 'angular'
import '@uirouter/angularjs'
import { UrlRouterProvider } from '@uirouter/angularjs'
import domready = require('domready')
import './jobs/JobsModule'
import './auth/AuthModule'

angular.module('app', ['ui.router', 'jobs', 'auth'])
    .config(['$urlRouterProvider', ($urlRouterProvider: UrlRouterProvider) => {
        $urlRouterProvider.otherwise('/jobs')
    }])

domready(() => {
    angular.bootstrap(document, ['app'])
})
