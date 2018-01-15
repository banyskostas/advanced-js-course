import { Request } from 'restify'

export function validateClient(credentials: any, _: Request, cb: any) {
    console.log('Validate client, credentials:', credentials)
    cb(null, true)
}

export function grantUserToken(credentials: any, _: Request, cb: any) {
    console.log('Grant user token, credentials:', credentials)
    cb(null, credentials.username + ':' + credentials.password)
}

export function authenticateToken(token: string, req: Request, cb: any) {
    console.log('Authenticate token:', token)
    req.username = token.split(':')[0]
    cb(null, true)
}
