import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'bt-user-friends',
    templateUrl: 'app/user-friends.html'
})
export class UserFriendsComponent {
    @Input() friends: string[]
    @Output() onFriendRemove = new EventEmitter<string>()

    remove = (friend: string) => {
        this.onFriendRemove.emit(friend)
    }
}

