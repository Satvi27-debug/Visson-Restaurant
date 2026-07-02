const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations, cancelReservation, getAllReservations, getAvailability, completeReservation, clearCompletedReservations } = require('../controllers/reservationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createReservation)
  .get(protect, admin, getAllReservations);

router.get('/my-reservations', protect, getUserReservations);
router.delete('/completed', protect, admin, clearCompletedReservations);
router.put('/:id/cancel', protect, cancelReservation);
router.put('/:id/complete', protect, admin, completeReservation);
router.get('/availability', protect, getAvailability);

module.exports = router;
