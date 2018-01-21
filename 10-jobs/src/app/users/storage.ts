import * as uuid from 'uuid/v4'
import { MongoClient } from 'mongodb'

export interface Claim {
    name: string
    value: string
}

export interface UserSaveRequest {
    name: string
    login: string
    password: string
    claims: Claim[]
}

export interface User {
    id: string
    name: string
    login: string
    claims: Claim[]
}

function toModel(mongoObject: any): User|null {
    if (!mongoObject) {
        return null
    }

    return {
        id: mongoObject._id,
        name: mongoObject.name,
        login: mongoObject.login,
        claims: mongoObject.claims
    }
}

export class MongoUsersStorage {
    usersCollection: any

    constructor(mongoClient: MongoClient) {
        this.usersCollection = mongoClient.db('darbobirza')
            .collection('users')
    }

    saveNew(user: UserSaveRequest): Promise<User> {
        user['_id'] = uuid()

        return this.usersCollection.save(user)
            .then(function() {
                return toModel(user)
            })
    }

    update(id: string, user: UserSaveRequest): Promise<any> {
        var update = {
            '$set': user
        }

        return this.usersCollection
            .update({ _id: id }, update)
    }

    getById(id: string): Promise<User|null> {
        return this.usersCollection
            .findOne({ _id: id })
            .then(toModel)
    }

    list(): Promise<User[]> {
        return this.usersCollection
            .find({})
            .map(toModel)
            .toArray()
    }

    remove(id: string): Promise<any> {
        return this.usersCollection
            .remove({ _id: id })
    }
}
