const mongoose = require('mongoose')

const parkingPlaceSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('PackingPlace', parkingPlaceSchema)