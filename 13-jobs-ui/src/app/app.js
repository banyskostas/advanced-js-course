import angular from 'angular'
import { JobsController } from './jobs/JobsController'
import domready from 'domready'

angular.module('app', [])
    .controller('JobsController', JobsController)

domready(() => {
    angular.bootstrap(document, ['app'])
    console.log('labas')
})
