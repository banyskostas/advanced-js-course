import * as restify from 'restify'
import { MongoClient } from 'mongodb'
import * as jobsApi from './jobs/api'
import { MongoJobsStorage } from './jobs/storage'
import * as employersApi from './employers/api'
import { MongoEmployersStorage } from './employers/storage'
import * as usersApi from './users/api'
import { MongoUsersStorage } from './users/storage'
import * as restifyCorsMiddleware from 'restify-cors-middleware'
import { oauthHooks }from './auth'
const restifyOauthServer = require('restify-oauth2')

var mongoUrl = 'mongodb://localhost:27017'
MongoClient.connect(mongoUrl, function(_, mongoClient) {
    const cors = restifyCorsMiddleware(<any>{
        origins: ['*'],
        allowHeaders: ['Authorization']
    })
    const server = restify.createServer()
    server.pre(cors.preflight)
    server.use(cors.actual)
    server.use(restify.plugins.bodyParser())
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.authorizationParser())

    restifyOauthServer.ropc(server, { tokenEndpoint: '/token', hooks: oauthHooks })

    jobsApi.register(server, new MongoJobsStorage(mongoClient))
    employersApi.register(server, new MongoEmployersStorage(mongoClient))
    usersApi.register(server, new MongoUsersStorage(mongoClient))

    server.listen(8888, () => {
        console.log('%s listening at %s', server.name, server.url);
    })
})