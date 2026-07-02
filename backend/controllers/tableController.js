const Table = require('../models/Table');

const getTableStats = async (req, res) => {
  try {
    const tables = await Table.find();
    const stats = {
      total: tables.length,
      capacity2: tables.filter(t => t.capacity === 2).length,
      capacity3: tables.filter(t => t.capacity === 3).length,
      capacity4: tables.filter(t => t.capacity === 4).length,
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTableStats };
