var uuid = require('uuid/v4')
var moment = require('moment')

function jobToDto(job) {
    job.id = job._id
    delete job._id
    return job
}

function register(server, mongoClient) {
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
        var mongoQuery = {}
        if (filter.namePart) {
            mongoQuery.name = new RegExp('.*' + filter.namePart + '.*')
        }

        if (filter.employerId) {
            mongoQuery.employerId = filter.employerId
        }

        var dateFilter = {}
        if (filter.startingFrom) {
            var startingFrom = moment(filter.startingFrom)
            if (startingFrom.isValid()) {
                dateFilter['$gte'] = startingFrom.toDate()
            }
        }

        if (filter.startingTo) {
            var startingTo = moment(filter.startingTo)
            if (startingTo.isValid()) {
                dateFilter['$lt'] = startingTo.toDate()
            }
        }
        if (Object.keys(dateFilter).length) {
            mongoQuery.startDate = dateFilter
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

module.exports.register = register
