const express = require('express');
const router = express.Router();
const { submitComplaint, getComplaints, resolveComplaint, deleteComplaint } = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, submitComplaint)
  .get(protect, admin, getComplaints);

router.put('/:id/resolve', protect, admin, resolveComplaint);
router.delete('/:id', protect, admin, deleteComplaint);

module.exports = router;
