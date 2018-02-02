import { Server, Request, Response, Next } from 'restify'
import { mustAuthenticate } from '../auth'
import { MongoUsersStorage, User, UserSaveRequest } from './storage'
import { MongoEmployersStorage } from '../employers/storage'
import * as Joi from 'joi'
import { validate, Validator } from '../validate'

const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    login: Joi.string().alphanum().required(),
    password: Joi.string().required(),
    claims: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().required(),
            value: Joi.string().required(),
        }).required()
    ).required()
})

export function register(server: Server, storage: MongoUsersStorage, employersStorage: MongoEmployersStorage) {
    function validateUser(user: UserSaveRequest) : Promise<void> {
        const role = user.claims.find(x => x.name === 'role')
        if (!role || role.value !== 'Employer') {
            return Promise.resolve()
        }

        const employerClaim = user.claims.find(c => c.name === 'employerId')
        if (!employerClaim) {
            return Promise.reject('Employer must have employer id')
        }

        const employerId = employerClaim.value
        return employersStorage.getById(employerId)
            .then(employer => {
                if (!employer) {
                    return Promise.reject('Employer with id ' + employerId + ' was not found')
                }

                return Promise.resolve()
            })
    }

    server.post('/users', mustAuthenticate('Administrator'), validate(new Validator<User>(userSchema)), async function(req: Request, resp: Response, next: Next) {
        try {
            await validateUser(req.body)
            const u = await storage.saveNew(req.body)
            resp.status(201)
            resp.header('Location', '/users/' + u.id)
            resp.send(u)
            next()
        } catch (error) {
            resp.status(400)
            resp.send({ message: error })
            resp.end()
            next()
        }
    })

    server.post('/users/:id', mustAuthenticate('Administrator'), validate(new Validator<User>(userSchema)), function(req: Request, resp: Response, next: Next) {
        storage.update(req.params.id, req.body)
            .then(function() {
                return storage.getById(req.params.id)
            })
            .then(function(u: User|null) {
                if (!u) {
                    resp.status(404)
                    resp.send({ message: 'User with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(u)
                }
                next()
            })
    })

    server.get('/users', mustAuthenticate('Administrator'), function(_: Request, resp: Response, next: Next) {
        storage.list()
            .then(function(users: User[]) {
                resp.send(users)
                next()
            })
    })

    server.get('/users/:id', mustAuthenticate('Administrator'), function(req: Request, resp: Response, next: Next) {
        storage.getById(req.params.id)
            .then(function(u: User|null) {
                if (!u) {
                    resp.status(404)
                    resp.send({ message: 'User with id ' + req.params.id + ' was not found' })
                } else {
                    resp.send(u)
                }
                next()
            })
    })

    server.del('/users/:id', mustAuthenticate('Administrator'), function(req: Request, resp: Response, next: Next) {
        storage.remove(req.params.id)
            .then(function() {
                resp.status(204)
                resp.end()
                next()
            })
    })

}
