const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

const createReservation = async (req, res) => {
  try {
    const { date, timeSlot, guests } = req.body;

    if (guests < 1 || guests > 4) {
      return res.status(400).json({ message: 'Invalid guest count. Must be between 1 and 4.' });
    }

    // Determine required table capacity
    let requiredCapacity;
    if (guests <= 2) requiredCapacity = 2;
    else if (guests === 3) requiredCapacity = 3;
    else if (guests === 4) requiredCapacity = 4;

    // Find all tables with the required capacity
    const availableTables = await Table.find({ capacity: requiredCapacity });
    
    // Find conflicting reservations on the same date (Entire Day reservation)
    const conflictingReservations = await Reservation.find({
      date,
      status: 'Booked'
    });

    const bookedTableIds = conflictingReservations.map(res => res.table.toString());

    // Find the first available table
    const tableToAssign = availableTables.find(t => !bookedTableIds.includes(t._id.toString()));

    if (!tableToAssign) {
      return res.status(400).json({ message: 'No Tables Available' });
    }

    // Double booking check for user
    const existingUserReservation = await Reservation.findOne({
      user: req.user._id,
      date,
      status: 'Booked'
    });

    if (existingUserReservation) {
      return res.status(400).json({ message: 'You already have a reservation for this time slot.' });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      table: tableToAssign._id,
      date,
      timeSlot,
      guests,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).populate('table');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    // Check if it belongs to user or if user is admin
    if (reservation.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    reservation.status = 'Cancelled';
    await reservation.save();
    res.json({ message: 'Reservation cancelled', reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'username').populate('table');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const { date, timeSlot } = req.query;
    if (!date || !timeSlot) {
      return res.status(400).json({ message: 'Date and timeSlot are required' });
    }

    const tables = await Table.find();
    const booked = await Reservation.find({ date, status: 'Booked' });
    
    const bookedTableIds = booked.map(b => b.table.toString());
    
    const stats = {
      2: { available: 0, booked: 0 },
      3: { available: 0, booked: 0 },
      4: { available: 0, booked: 0 },
    };

    tables.forEach(t => {
      if (bookedTableIds.includes(t._id.toString())) {
        stats[t.capacity].booked += 1;
      } else {
        stats[t.capacity].available += 1;
      }
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReservation, getUserReservations, cancelReservation, getAllReservations, getAvailability };
