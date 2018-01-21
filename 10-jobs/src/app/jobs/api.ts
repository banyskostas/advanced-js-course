import * as Joi from 'joi'
import { validate } from '../validate'
import { Request, Response, Next } from 'restify'
import { mustAuthenticate } from '../auth'

function jobToDto(job: any) {
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

export function register(server: any, jobsStorage: any) {
    server.post('/jobs', mustAuthenticate(), validate(jobCreateSchema), function(req: Request, resp: Response, next: Next) {
        jobsStorage.saveJob(req.body)
            .then(function(job: any) {
                resp.status(201)
                resp.header('Location', '/jobs/' + job._id)
                resp.send(jobToDto(job))
                next()
            })
    })

    server.post('/jobs/:id', mustAuthenticate(), validate(jobUpdateSchema), function(req: Request, resp: Response, next: Next) {
        jobsStorage.updateJob(req.params.id, req.body)
            .then(function() {
                return jobsStorage.getJobById(req.params.id)
            })
            .then(function(job: any) {
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
    server.get('/jobs', mustAuthenticate(), function(req: Request, resp: Response, next: Next) {
        jobsStorage.listJobs(req.query)
            .then(function(jobs: any[]) {
                resp.send(jobs.map(jobToDto))
                next()
            })
    })

    server.get('/jobs/:id', mustAuthenticate(), function(req: Request, resp: Response, next: Next) {
        jobsStorage.getJobById(req.params.id)
            .then(function(job: any) {
                if (!job) {
                    resp.status(404)
                    resp.send({ message: 'Job with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(jobToDto(job))
                }
                next()
            })
    })

    server.del('/jobs/:id', mustAuthenticate(), function(req: Request, resp: Response, next: Next) {
        jobsStorage.removeJob(req.params.id)
            .then(function() {
                resp.status(204)
                resp.end()
                next()
            })
    })
}
