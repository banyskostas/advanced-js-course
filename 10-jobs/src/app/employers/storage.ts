import * as uuid from 'uuid/v4'
import { MongoClient } from 'mongodb'

export interface EmployerSaveRequest {
    name: string
}

export interface Employer {
    id: string
    name: string
}

function toModel(mongoObject: any): Employer|null {
    if (!mongoObject) {
        return null
    }

    return {
        id: mongoObject._id,
        name: mongoObject.name
    }
}

export class MongoEmployersStorage {
    employersCollection: any

    constructor(mongoClient: MongoClient) {
        this.employersCollection = mongoClient.db('darbobirza')
            .collection('employers')
    }

    saveNew(employer: EmployerSaveRequest): Promise<Employer> {
        employer['_id'] = uuid()

        return this.employersCollection.save(employer)
            .then(function() {
                return toModel(employer)
            })
    }

    update(id: string, employer: EmployerSaveRequest): Promise<any> {
        var update = {
            '$set': employer
        }

        return this.employersCollection
            .update({ _id: id }, update)
    }

    getById(id: string): Promise<Employer|null> {
        return this.employersCollection
            .findOne({ _id: id })
            .then(toModel)
    }

    list(): Promise<Employer[]> {
        return this.employersCollection
            .find({})
            .map(toModel)
            .toArray()
    }

    remove(id: string): Promise<any> {
        return this.employersCollection
            .remove({ _id: id })
    }
}
