import uuid from 'uuid/v4'
import moment from 'moment'
/*
var uuid = require('uuid/v4')
var moment = require('moment')
*/

function jobToDto(job) {
    job.id = job._id
    delete job._id
    return job
}

export function register(server, mongoClient) {
    var jobsCollection = mongoClient.db('darbobirza')
        .collection('jobs')

    function saveJob(job) {
        job._id = uuid()
        job.startDate = moment(job.startDate).toDate()

        return jobsCollection.save(job)
            .then(function() {
                return job
            })
    }

    function updateJob(id, job) {
        var update = {
            '$set': job
        }

        return jobsCollection
            .update({ _id: id }, update)
    }

    function getJobById(id) {
        return jobsCollection
            .findOne({ _id: id })
    }

    // /jobs?namePart=foo&employerId=1&startingFrom=2017-01-01&startingTo=2017-02-01&category=restaurants,cleaning&rateFrom=10&rateTo=20&city=Vilnius
    function listJobs(filter) {
        const mongoQuery = {}
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

        return jobsCollection
            .find(mongoQuery)
            .toArray()
    }

    function removeJob(id) {
        return jobsCollection
            .remove({ _id: id })
    }

    server.post('/jobs', function(req, resp, next) {
        /*
         * {
         *      "name": "kazkas",
         *      "description": "kzkas",
         *      "employerId": 1,
         *      "startDate": "2018-01-23T14:00:00Z",
         *      "category": "restaurants",
         *      "expectedDuration": 120,
         *      "rate": 8.5,
         *      "address": {
         *              "city": "Vilnius",
         *              "street": "Savanoriu pr.",
         *              "house": "23A",
         *              "flat": "34A"
         *      }
         * } */
        saveJob(req.body)
            .then(function(job) {
                resp.status(201)
                resp.header('Location', '/jobs/' + job._id)
                resp.send(jobToDto(job))
                next()
            })
    })

    server.post('/jobs/:id', function(req, resp, next) {
        updateJob(req.params.id, req.body)
            .then(function() {
                return getJobById(req.params.id)
            })
            .then(function(job) {
                if (!job) {
                    resp.status(404)
                    resp.send({ message: 'Job with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(jobToDto(job))
                }
                next()
            })
    })

    // /jobs?namePart=foo&employerId=1&startingFrom=2017-01-01&startingTo=2017-02-01&category=restaurants,cleaning&rateFrom=10&rateTo=20&city=Vilnius
    server.get('/jobs', function(req, resp, next) {
        listJobs(req.query)
            .then(function(jobs) {
                resp.send(jobs.map(jobToDto))
                next()
            })
    })

    server.get('/jobs/:id', function(req, resp, next) {
        getJobById(req.params.id)
            .then(function(job) {
                if (!job) {
                    resp.status(404)
                    resp.send({ message: 'Job with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(jobToDto(job))
                }
                next()
            })
    })

    server.del('/jobs/:id', function(req, resp, next) {
        removeJob(req.params.id)
            .then(function() {
                resp.status(204)
                resp.end()
                next()
            })
    })
}
