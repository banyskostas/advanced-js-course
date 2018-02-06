import { OauthService } from './OauthService'
import { SecurityContext } from './SecurityContext'

export class LoginController {
    static $inject = [ 'OauthService', 'SecurityContext', '$state' ]
    username: string
    password: string
    message: string

    constructor(
        private oauthService: OauthService,
        private securityContext: SecurityContext,
        private $state: any) {
    }

    login() {
        this.message = ''
        this.oauthService.getToken(
            'our-awesome-app',
            'our-awesome-secret',
            this.username,
            this.password).then(token => {
                this.securityContext.setToken(token)
                this.$state.go('jobs.list')
            }).catch(() => {
                this.message = 'Invalid username or password'
            })
    }
}
