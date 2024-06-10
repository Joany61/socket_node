const http = require('http')
const app = require('./app')
const { Server } = require('socket.io')
const server = http.createServer(app)

// const https = require('https');
// var data_w = ''
// try{
    
//     const options = {
//         method: 'GET',
//         hostname: 'weatherapi-com.p.rapidapi.com',
//         port: null,
//         path: '/current.json?q=-21.453611%2C%2047.085833',
//         headers: {
//             'x-rapidapi-key': 'd8efeefa35msh3f63c2220ba3c7ep156a05jsn49ebbaa1f29f',
//             'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
//         }
//     };

//     const req = https.request(options, function (res) {
    //         var data = "";
    
    //         res.on('data', function (chunk) {
        //             data+=chunk;
        //         });
        //         res.on('end', function () {
            //             const data_w = JSON.parse(data)
            //             console.log(data_w)
            //         });
            //     });
            //     req.end()
            // }
// catch(e) {
    //     console.log('fetch error')
    //     return
    // }
    
const io = new Server(server)
io.on('connection', (socket) => {
    console.log('connected')
    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('message', (msg) => {
        socket.broadcast.emit('response', msg)
        console.log('message: ' + msg)
    })
})                                                                                                                                                  

server.listen( process.env.PORT || 8080, () => {
    console.log('server')
})