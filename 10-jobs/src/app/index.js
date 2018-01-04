import * as restify from 'restify'
import { MongoClient } from 'mongodb'
import * as jobsApi from './jobs/api'
import { MongoJobsStorage } from './jobs/storage'

var mongoUrl = 'mongodb://localhost:27017'
MongoClient.connect(mongoUrl, function(error, mongoClient) {
    var server = restify.createServer()
    server.use(restify.plugins.bodyParser())
    server.use(restify.plugins.queryParser())

    jobsApi.register(server, new MongoJobsStorage(mongoClient))
    
    server.listen(8080, () => {
        console.log('%s listening at %s', server.name, server.url);
    })
})
