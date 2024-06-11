"use strict";

const express = require('express')
const path = require('path')
const authRoutes = require('./api/auth.routes')
const protectedRoutes = require('./api/protected.routes')
require('dotenv').config()

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/protected', protectedRoutes)
app.use(express.static('./public'))

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

// app.get('/forecast', (req, res) => {
//     res.send
// })



module.exports = app