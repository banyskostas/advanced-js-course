import * as uuid from 'uuid/v4'
import { MongoClient, Collection } from 'mongodb'
import { hash, verify } from '../hash'

export interface Claim {
    name: string
    value: string
}

interface MongoUser {
    _id: string
    name: string
    password: string
    login: string
    claims: Claim[]
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

function toModel(mongoObject: MongoUser): User {
    return {
        id: mongoObject._id,
        name: mongoObject.name,
        login: mongoObject.login,
        claims: mongoObject.claims
    }
}

async function toMongoObject(id: string, user: Partial<UserSaveRequest>): Promise<Partial<MongoUser>> {
    return {
        _id: id,
        name: user.name,
        login: user.login,
        password: user.password ? await hash(user.password) : undefined,
        claims: user.claims
    }
}

export class MongoUsersStorage {
    usersCollection: Collection<MongoUser>

    constructor(mongoClient: MongoClient) {
        this.usersCollection = mongoClient.db('darbobirza')
            .collection('users')
    }

    async saveNew(user: UserSaveRequest): Promise<User> {
        const saved = await toMongoObject(uuid(), user)

        await this.usersCollection.save(saved)
        return toModel(<MongoUser>saved)
    }

    async update(id: string, user: Partial<UserSaveRequest>): Promise<any> {
        const saved = await toMongoObject(id, user)

        var update = {
            '$set': saved
        }

        return this.usersCollection
            .update({ _id: id }, update)
    }

    async getById(id: string): Promise<User|null> {
        const found = await this.usersCollection
            .findOne({ _id: id })

        return found ? toModel(found) : null
    }

    async verifyCredentials(username: string, password: string) : Promise<User|null> {
        const user = await this.usersCollection
            .findOne({ login: username })
        if (!user) {
            return null
        }

        const passwordMatches = await verify(user.password, password)
        if (!passwordMatches) {
            return null
        }

        return toModel(user)
    }

    async list(): Promise<User[]> {
        const users = await this.usersCollection
            .find({})
            .toArray()

        return users.map(toModel)
    }

    remove(id: string): Promise<any> {
        return this.usersCollection
            .remove({ _id: id })
    }
}
