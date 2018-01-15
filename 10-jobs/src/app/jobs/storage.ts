import * as uuid from 'uuid/v4'
import * as moment from 'moment'
import { MongoClient } from 'mongodb'

export class MongoJobsStorage {
    jobsCollection: any

    constructor(mongoClient: MongoClient) {
        this.jobsCollection = mongoClient.db('darbobirza')
            .collection('jobs')
    }

    saveJob(job: any) {
        job._id = uuid()
        job.startDate = moment(job.startDate).toDate()

        return this.jobsCollection.save(job)
            .then(function() {
                return job
            })
    }

    updateJob(id: string, job: any) {
        var update = {
            '$set': job
        }

        return this.jobsCollection
            .update({ _id: id }, update)
    }

    getJobById(id: string) {
        return this.jobsCollection
            .findOne({ _id: id })
    }

    // /jobs?namePart=foo&employerId=1&startingFrom=2017-01-01&startingTo=2017-02-01&category=restaurants,cleaning&rateFrom=10&rateTo=20&city=Vilnius
    listJobs(filter: any) {
        const mongoQuery: any = {}
        if (filter.namePart) {
            mongoQuery.name = new RegExp('.*' + filter.namePart + '.*')
        }

        if (filter.employerId) {
            mongoQuery.employerId = filter.employerId
        }

        const dateFilter = {}
        if (filter.startingFrom) {
            const startingFrom = moment(filter.startingFrom)
            if (startingFrom.isValid()) {
                dateFilter['$gte'] = startingFrom.toDate()
            }
        }

        if (filter.startingTo) {
            const startingTo = moment(filter.startingTo)
            if (startingTo.isValid()) {
                dateFilter['$lt'] = startingTo.toDate()
            }
        }
        if (Object.keys(dateFilter).length) {
            mongoQuery.startDate = dateFilter
        }

        if (filter.category) {
            const categories = filter.category.split(',')
            mongoQuery.category = {
                '$in': categories
            }
        }

        const rateFilter = {}
        if (filter.rateFrom) {
            const rateFrom = parseFloat(filter.rateFrom)
            if (!isNaN(rateFrom)) {
                rateFilter['$gte'] = rateFrom
            }
        }

        if (filter.rateTo) {
            const rateTo = parseFloat(filter.rateTo)
            if (!isNaN(rateTo)) {
                rateFilter['$lt'] = rateTo
            }
        }
        if (Object.keys(rateFilter).length) {
            mongoQuery.rate = rateFilter
        }

        if (filter.city) {
            mongoQuery['address.city'] = filter.city
        }

        return this.jobsCollection
            .find(mongoQuery)
            .toArray()
    }

    removeJob(id: string) {
        return this.jobsCollection
            .remove({ _id: id })
    }
}
