var restify = require('restify')

var server = restify.createServer()
server.use(restify.plugins.bodyParser())

var users = [{
    login: "vytautas",
    name: "Vytautas Mackonis"
}]

server.get('/users', function(req, resp, next) {
    resp.send(users)
    next()
})

server.put('/users/:login', function(req, resp, next) {
    var login = req.params.login
    var user = req.body
    user.login = login
    users.push(user)
    resp.end()
    next()
})

server.get('/users/:login', function(req, resp, next) {
    var login = req.params.login
    var user = users.filter(function(u) {
        return u.login === login
    })[0]

    if (user) {
        resp.send(user)
    } else {
        resp.status(404)
        resp.end()
    }

    next()
})

server.del('/users/:login', function(req, resp, next) {
    var toRemove = users.findIndex(function(u){
        return u.login === req.params.login
    })

    if (toRemove >= 0) {
        users.splice(toRemove, 1)
    }

    resp.end()
    next()
})

server.listen(8080, function() {
    console.log('Listening on 8080')
})
