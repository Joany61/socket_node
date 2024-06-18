const express = require('express')
const router = express.Router()
const { createBooking, getBookingByUser, getBookingById, get, getAllbooking } = require('../services/booking.service')

router.post('/', createBooking)
router.get('/renter/:renterId', getBookingByUser)
router.get('/:bookingId', getBookingById)
router.get('/', getAllbooking)

module.exports = router
