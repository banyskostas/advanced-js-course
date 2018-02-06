import * as angular from 'angular'
import { JobsController } from './JobsController'
import { JobEditController } from './JobEditController'
import { JobService } from './JobsService'
import { StateProvider } from '@uirouter/angularjs'
import '@uirouter/angularjs'

angular.module('jobs', ['ui.router'])
    .controller('JobsController', JobsController)
    .controller('JobEditController', JobEditController)
    .service('JobService', JobService)
    .config(['$stateProvider', ($stateProvider: StateProvider) => {
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
    }])
