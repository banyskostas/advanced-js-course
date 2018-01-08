import angular from 'angular'
import { JobsController } from './jobs/JobsController'
import domready from 'domready'
import '@uirouter/angularjs'

angular.module('app', ['ui.router'])
    .controller('JobsController', JobsController)
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
      $stateProvider.state({
        name: 'jobs',
        url: '/jobs',
        templateUrl: '/app/jobs/list.html',
        controller: 'JobsController as jobs'
      })

      $urlRouterProvider.otherwise('/jobs')
    }])

domready(() => {
    angular.bootstrap(document, ['app'])
})
