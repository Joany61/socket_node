const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    matricule: {
        type: Array,
        required: true
    },
    parcking_place_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingPlace',
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    payment_id: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'canceled'],
        default: 'pending'
    }
})

module.exports = mongoose.model('Booking', bookingSchema)