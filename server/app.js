const express = require('express')
const http = require('http')
const session = require('express-session')

require('./db.service')

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}
const port = 2000
const app = express()

app.set('port', port)
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    resave: false
}));

app.set('port', port)

const server = http.createServer(app)
const controllers = require('./controllers')

controllers(app)

server.listen(port, `0.0.0.0`)
server.on('error', onError)
