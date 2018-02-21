import * as angular from 'angular'
import { LoginController } from './LoginController'
import { OauthService } from './OauthService'
import { SecurityContext } from './SecurityContext'
import { TokenValidatingHttpInterceptor } from './TokenValidatingHttpInterceptor'
import '@uirouter/angularjs'
import { StateProvider } from '@uirouter/angularjs'

angular.module('auth', ['ui.router'])
    .controller('LoginController', LoginController)
    .service('OauthService', OauthService)
    .service('SecurityContext', SecurityContext)
    .config(['$httpProvider', ($httpProvider: ng.IHttpProvider) => {
        $httpProvider.interceptors.push(['SecurityContext', '$state',
            (securityContext: SecurityContext, $state: any) => {
            return new TokenValidatingHttpInterceptor(securityContext, $state)
        }])
    }])
    .config(['$stateProvider', ($stateProvider: StateProvider) => {
        $stateProvider.state({
            name: 'auth'
        })

        $stateProvider.state({
            name: 'auth.login',
            url: '/login',
            templateUrl: '/app/auth/login.html',
            controller: 'LoginController as login'
        })
    }])
