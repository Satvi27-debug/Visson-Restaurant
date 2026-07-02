const express = require('express');
const router = express.Router();
const { getVisitors, deleteVisitor } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/visitors', protect, admin, getVisitors);
router.delete('/visitors/:id', protect, admin, deleteVisitor);

module.exports = router;
