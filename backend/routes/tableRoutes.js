const express = require('express');
const router = express.Router();
const { getTableStats } = require('../controllers/tableController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getTableStats);

module.exports = router;
