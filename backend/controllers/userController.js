const User = require('../models/User');
const Reservation = require('../models/Reservation');
const Complaint = require('../models/Complaint');

const getVisitors = async (req, res) => {
  try {
    const users = await User.find({ role: 'Customer' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVisitor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cascade delete reservations and complaints
    await Reservation.deleteMany({ user: user._id });
    await Complaint.deleteMany({ user: user._id });
    
    await user.deleteOne();
    res.json({ message: 'User and associated data removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVisitors, deleteVisitor };
