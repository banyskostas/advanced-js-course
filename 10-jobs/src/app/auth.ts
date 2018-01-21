import { Request, Response, Next } from 'restify'
import * as jwt from 'jsonwebtoken'

interface ClientCredentials {
    clientId: string
    clientSecret: string
}

interface LoginCredentials {
    clientId: string
    clientSecret: string
    username: string
    password: string
}

interface OauthHookCallback<T> {
    (e: Error | null, t: T | false): void
}

interface User {
    login: string
    password: string
    role: string
    employerId?: string
}

const users: User[] = [
    {
        login: 'admin',
        password: 'changeit',
        role: 'Administrator',
    },
    {
        login: 'maxima',
        password: 'maxima123',
        role: 'Employer',
        employerId: 'foo'
    },
    {
        login: 'maxima2',
        password: 'maxima456',
        role: 'Employer',
        employerId: 'foo'
    },
    {
        login: 'mcdonalds',
        password: 'imlovinit',
        role: 'Employer',
        employerId: 'bar'
    }
]


const signatureSecret = 'sdfjkidiubwf'

function validateClient(_: ClientCredentials, __: Request, cb: OauthHookCallback<boolean>) {
    cb(null, true)
}

function grantUserToken(credentials: LoginCredentials, _: Request, cb: OauthHookCallback<string>) {
    const user = users.find(x =>
        x.login === credentials.username.toLowerCase()
        && x.password === credentials.password
    )
    if (!user) {
        cb(null, false)
    } else {
        const payload = {
            login: user.login,
            role: user.role,
            employerId: user.employerId
        }
        const token = jwt.sign(payload, signatureSecret)
        cb(null, token)
    }
}

function authenticateToken(token: string, req: Request, cb: OauthHookCallback<boolean>) {
    try {
        const payload = jwt.verify(token, signatureSecret)
        req.params.user = payload
        cb(null, true)
    } catch (e) {
        cb(null, false)
    }
}

export const oauthHooks = {
    grantUserToken,
    authenticateToken,
    validateClient
}

export function mustAuthenticate(role?: string) {
    return (req: Request, resp: Response, next: Next) => {
        if (!req.params.user){
            resp.send(401, {
                message: 'Need to log in to use this endpoint'
            })
            resp.end()
            next(false)
        } else {
            if (role && req.params.user.role !== role) {
                resp.send(403, {
                    message: 'You are not authorized to perform this request'
                })
                resp.end()
                next(false)
            } else {
                next()
            }
        }
    }
}
