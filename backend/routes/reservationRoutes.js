const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations, cancelReservation, getAllReservations, getAvailability } = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createReservation)
  .get(protect, admin, getAllReservations);

router.get('/my-reservations', protect, getUserReservations);
router.put('/:id/cancel', protect, cancelReservation);
router.get('/availability', protect, getAvailability);

module.exports = router;
