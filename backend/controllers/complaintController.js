const Complaint = require('../models/Complaint');

const submitComplaint = async (req, res) => {
  try {
    const { subject, text } = req.body;
    const complaint = await Complaint.create({
      user: req.user._id,
      subject,
      text,
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'username');
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    complaint.status = 'Resolved';
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    await complaint.deleteOne();
    res.json({ message: 'Complaint removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitComplaint, getComplaints, resolveComplaint, deleteComplaint };
