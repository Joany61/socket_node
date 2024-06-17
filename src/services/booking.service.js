const Booking = require('../models/booking')

const createBooking = async (req, res) => {
    try {
        const { renter_id, parking_place_id, start_time, end_time } = req.body;
    
        // Check for missing fields
        if (!renter_id || !parking_place_id || !start_time || !end_time) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
    
        // Check parking place availability during requested timeframe
        const parkingPlace = await ParkingPlace.findById(parking_place_id);
        if (!parkingPlace || !parkingPlace.available) {
          return res.status(400).json({ message: 'Parking space unavailable' });
        }
    
        // Check for overlapping bookings
        const existingBookings = await Booking.find({
          parking_place_id,
          $or: [
            { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
            { start_time: { $gt: start_time }, end_time: { $lt: end_time } }
          ]
        });
    
        if (existingBookings.length > 0) {
          return res.status(400).json({ message: 'Parking space already booked during this time' });
        }
    
        // Calculate total cost based on parking rates and duration
        const totalCost = calculateCost(parkingPlace.hourly_rate, start_time, end_time); // Implement calculateCost function
    
        const newBooking = new Booking({
          renter_id,
          parking_place_id,
          start_time,
          end_time,
          total_cost,
          status: 'pending' // Initial booking status
        });
    
        const savedBooking = await newBooking.save();
        parkingPlace.available = false; // Update parking space availability
        await parkingPlace.save();
    
        res.json(savedBooking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getBookingByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ renter_id: req.params.renterId });
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

function calculateCost(start_time, end_time){
    const durationInHours = (end_time - start_time) / (1000 * 60 * 60)
    return hourly_rate = durationInHours
}


module.exports = { createBooking, getBookingByUser, getBookingById}