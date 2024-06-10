"use strict";

const express = require('express')
require('dotenv').config()
const path = require('path')


const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

// app.get('/forecast', (req, res) => {
//     res.send
// })

app.use(express.static('./public'))


module.exports = app