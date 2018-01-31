import { Component, Input } from '@angular/core'

@Component({
    selector: 'bt-user',
    templateUrl: 'app/user.html'
})
export class UserComponent {
    @Input() user: any

    removeFriend = (friend: string) => {
        const index = this.user.friends.indexOf(friend)
        if (index > -1) {
            this.user.friends.splice(index, 1)
        }
    }
}
