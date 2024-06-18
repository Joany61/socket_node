const http = require('http')
const app = require('./app')
const { Server } = require('socket.io')
const server = http.createServer(app)
const dbCon = require('./config/dbConn')

server.listen( process.env.PORT || 8080, () => {

    console.log('server')
})