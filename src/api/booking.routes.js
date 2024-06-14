const express = require('express')
const router = express.Router()
const { createBooking, getBookingByUser, getBookingById } = require('../services/booking.service')

router.post('/', createBooking)
router.get('/renter/:renterId', getBookingByUser)
router.get('/:bookingId', getBookingById)

module.exports = router
