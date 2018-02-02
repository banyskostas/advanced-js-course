import { Server, Request, Response, Next } from 'restify'
import { mustAuthenticate } from '../auth'
import { EmployersStorage, Employer } from './storage'
import * as Joi from 'joi'
import { validate, Validator } from '../validate'

const employerSchema = Joi.object().keys({
    name: Joi.string().required(),
})

interface OurResponse<TBody> {
    status: number
    headers: { [key: string]: string }
    body: TBody
}

export async function createEmployer(employer: Employer, storage: EmployersStorage) : Promise<OurResponse<Employer>> {
    const saved = await storage.saveNew(employer)
    return {
        status: 201,
        headers: {
            Location: '/employers/' + saved.id
        },
        body: saved
    }
}

export function register(server: Server, storage: EmployersStorage) {
    server.post('/employers', mustAuthenticate('Administrator'), validate(new Validator<Employer>(employerSchema)), async function(req: Request, resp: Response, next: Next) {
        const response = await createEmployer(req.body, storage)
        resp.status(response.status)
        const headers = Object.entries(response.headers)
        for (let i = 0; i < headers.length; i++) {
            const [key, value] = headers[i]
            resp.header(key, value)
        }
        resp.send(response.body)
        next()
    })

    server.post('/employers/:id', mustAuthenticate('Administrator'), validate(new Validator<Employer>(employerSchema)), function(req: Request, resp: Response, next: Next) {
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
