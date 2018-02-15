export function register(server) {
    server.get('/', function(req, res, next) {
        res.send('Hello world')
        next()
    })
}
