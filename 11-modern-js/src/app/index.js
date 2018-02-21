import * as restify from 'restify'
import { register } from './api'

const server = restify.createServer()

register(server)

server.listen(8080, () => console.log('Listening on 8080'))
z