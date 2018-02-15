import { Injectable } from '@angular/core'

export interface User {
    name: string
    lastName: string
    friends: string[]
}

@Injectable()
export class UsersService {
    getUsers() : User[] {
        return [
            {
                name: 'Vytautas',
                lastName: 'Mackonis',
                friends: ['Justas', 'Paulius', 'Laura']
            },
            {
                name: 'Marius',
                lastName: 'Jonaitis',
                friends: ['Egle', 'Jonas', 'Rasa']
            },
        ]
    }
}
