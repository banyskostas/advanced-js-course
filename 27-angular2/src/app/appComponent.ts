import { Component, Inject } from '@angular/core'
import { User, UsersService } from './usersService'

@Component({
    selector: 'bt-app',
    templateUrl: 'app/app.html'
})
export class AppComponent {
    name = 'vytautas'
    className = 'labas'
    value = 'foo'
    colors = [ 'red', 'blue', 'white' ]
    users: User[] = []

    constructor(@Inject(UsersService) usersService: UsersService) {
        this.users = usersService.getUsers()
    }

    clicked() {
        alert('clicked')
    }
}
