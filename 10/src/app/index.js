var restify = require('restify')
var MongoClient = require('mongodb').MongoClient
var jobsApi = require('./jobs/api')

var mongoUrl = 'mongodb://localhost:27017'
MongoClient.connect(mongoUrl, function(error, mongoClient) {
    var server = restify.createServer()
    server.use(restify.plugins.bodyParser())
    server.use(restify.plugins.queryParser())

    jobsApi.register(server, mongoClient)
    
    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    })
})
