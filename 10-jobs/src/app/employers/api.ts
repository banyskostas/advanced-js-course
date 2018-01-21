import { Server, Request, Response, Next } from 'restify'
import { mustAuthenticate } from '../auth'
import { MongoEmployersStorage, Employer } from './storage'
import * as Joi from 'joi'
import { validate } from '../validate'

const employerSchema = Joi.object().keys({
    name: Joi.string().required(),
})

export function register(server: Server, storage: MongoEmployersStorage) {
    server.post('/employers', mustAuthenticate('Administrator'), validate(employerSchema), function(req: Request, resp: Response, next: Next) {
        storage.saveNew(req.body)
            .then(function(emp: Employer) {
                resp.status(201)
                resp.header('Location', '/employers/' + emp.id)
                resp.send(emp)
                next()
            })
    })

    server.post('/employers/:id', mustAuthenticate('Administrator'), validate(employerSchema), function(req: Request, resp: Response, next: Next) {
        storage.update(req.params.id, req.body)
            .then(function() {
                return storage.getById(req.params.id)
            })
            .then(function(emp: Employer|null) {
                if (!emp) {
                    resp.status(404)
                    resp.send({ message: 'Employer with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(emp)
                }
                next()
            })
    })

    server.get('/employers', mustAuthenticate('Administrator'), function(_: Request, resp: Response, next: Next) {
        storage.list()
            .then(function(employers: Employer[]) {
                resp.send(employers)
                next()
            })
    })

    server.get('/employers/:id', mustAuthenticate('Administrator'), function(req: Request, resp: Response, next: Next) {
        storage.getById(req.params.id)
            .then(function(emp: Employer|null) {
                if (!emp) {
                    resp.status(404)
                    resp.send({ message: 'Employer with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(emp)
                }
                next()
            })
    })

    server.del('/employers/:id', mustAuthenticate('Administrator'), function(req: Request, resp: Response, next: Next) {
        storage.remove(req.params.id)
            .then(function() {
                resp.status(204)
                resp.end()
                next()
            })
    })

}
