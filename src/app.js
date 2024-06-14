"use strict";

const express = require('express')
const path = require('path')
const authRoutes = require('./api/auth.routes')
const protectedRoutes = require('./api/protected.routes')
const bookingRoutes = require('./api/booking.routes')
require('dotenv').config()
const app = express()

// ajout des routes
app.use('/auth', authRoutes)
app.use('/protected', protectedRoutes)
app.use('/booking', bookingRoutes)

// utilisation des middleware
app.use(express.json())
app.use(express.static('./public'))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

// app.get('/forecast', (req, res) => {
//     res.send
// })



module.exports = app