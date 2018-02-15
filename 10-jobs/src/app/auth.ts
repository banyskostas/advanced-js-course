import { Request, Response, Next } from 'restify'
import * as jwt from 'jsonwebtoken'
import { MongoUsersStorage } from './users/storage'

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

const signatureSecret = 'sdfjkidiubwf'

export class OAuthHooks {
    constructor(private storage: MongoUsersStorage) {
    }

    validateClient = (_: ClientCredentials, __: Request, cb: OauthHookCallback<boolean>) => {
        cb(null, true)
    }

    grantUserToken = async (credentials: LoginCredentials, _: Request, cb: OauthHookCallback<string>) => {
        const user = await this.storage.verifyCredentials(credentials.username, credentials.password)
        if (!user) {
            cb(null, false)
        } else {
            const role = user.claims.find(x => x.name === 'role')
            const employerId = user.claims.find(x => x.name === 'employerId')

            const payload = {
                login: user.login,
                role: role ? role.value : undefined,
                employerId: employerId ? employerId.value : undefined
            }
            const token = jwt.sign(payload, signatureSecret)
            cb(null, token)
        }
    }

    authenticateToken = (token: string, req: Request, cb: OauthHookCallback<boolean>) => {
        try {
            const payload = jwt.verify(token, signatureSecret)
            req.params.user = payload
            cb(null, true)
        } catch (e) {
            cb(null, false)
        }
    }
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
