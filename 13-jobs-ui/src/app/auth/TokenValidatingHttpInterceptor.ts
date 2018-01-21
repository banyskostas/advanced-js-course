import { SecurityContext } from './SecurityContext'
import 'tslib'

export class TokenValidatingHttpInterceptor implements ng.IHttpInterceptor {
    constructor(
        private securityContext: SecurityContext,
        private $state: any
    ) {
    }

    request = (config: ng.IRequestConfig): ng.IRequestConfig | ng.IPromise<ng.IRequestConfig> => {
        if (config.url.indexOf('/token') > -1) {
            return config
        }

        const token = this.securityContext.getToken()
        if (!token) {
            return config
        }

        return {
            ...config,
            headers: {
                ...config.headers,
                'Authorization': 'Bearer ' + token
            }
        }
    }

    responseError = (rejection: any)
            : ng.IPromise<ng.IHttpResponse<any>> | ng.IHttpResponse<any> => {
                if (rejection.status === 401) {
                    this.$state.go('auth.login')
                }

                return rejection
    }
}
