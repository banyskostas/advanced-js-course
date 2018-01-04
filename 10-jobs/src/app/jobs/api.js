import uuid from 'uuid/v4'
import moment from 'moment'
import Joi from 'joi'

function jobToDto(job) {
    job.id = job._id
    delete job._id
    return job
}

const jobUpdateSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    startDate: Joi.date().iso().required(),
    category: Joi.string().required(),
    expectedDuration: Joi.number().required(),
    rate: Joi.number().required(),
    address: Joi.object().keys({
        city: Joi.string().required(),
        street: Joi.string(),
        house: Joi.string(),
        flat: Joi.string()
    }).required()
})

const jobCreateSchema = jobUpdateSchema.keys({
    employerId: Joi.string().required(),
})

function formatValidationError(joiValidationError) {
    const validationErrors = joiValidationError.details
        .map(e => {
            return {
                field: e.path.join('.'),
                message: e.message
            }
        })

    return {
        validationErrors
    }
}

export function register(server, jobsStorage) {
    server.post('/jobs', function(req, resp, next) {
        const validationResult = Joi.validate(req.body, jobCreateSchema, {
            abortEarly: false,
            stripUnknown: true
        })
        if (validationResult.error) {
            resp.status(400)
            resp.send(formatValidationError(validationResult.error))
            next()
        } else {
            jobsStorage.saveJob(validationResult.value)
                .then(function(job) {
                    resp.status(201)
                    resp.header('Location', '/jobs/' + job._id)
                    resp.send(jobToDto(job))
                    next()
                })
        }
    })

    server.post('/jobs/:id', function(req, resp, next) {
        const validationResult = Joi.validate(req.body, jobUpdateSchema, {
            abortEarly: false,
            stripUnknown: true
        })
        if (validationResult.error) {
            resp.status(400)
            resp.send(formatValidationError(validationResult.error))
            next()
        } else {
            jobsStorage.updateJob(req.params.id, validationResult.value)
                .then(function() {
                    return jobsStorage.getJobById(req.params.id)
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
        }
    })

    // /jobs?namePart=foo&employerId=1&startingFrom=2017-01-01&startingTo=2017-02-01&category=restaurants,cleaning&rateFrom=10&rateTo=20&city=Vilnius
    server.get('/jobs', function(req, resp, next) {
        jobsStorage.listJobs(req.query)
            .then(function(jobs) {
                resp.send(jobs.map(jobToDto))
                next()
            })
    })

    server.get('/jobs/:id', function(req, resp, next) {
        jobsStorage.getJobById(req.params.id)
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
        jobsStorage.removeJob(req.params.id)
            .then(function() {
                resp.status(204)
                resp.end()
                next()
            })
    })
}
