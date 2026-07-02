const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Table = require('./models/Table');

dotenv.config();

const seedTables = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Check if tables already exist
    const count = await Table.countDocuments();
    if (count > 0) {
      console.log('Tables already seeded.');
      process.exit();
    }

    const tables = [];
    
    // 20 tables for 2 people
    for (let i = 1; i <= 20; i++) {
      tables.push({ tableNumber: `Table-2-${i.toString().padStart(2, '0')}`, capacity: 2 });
    }
    
    // 20 tables for 3 people
    for (let i = 1; i <= 20; i++) {
      tables.push({ tableNumber: `Table-3-${i.toString().padStart(2, '0')}`, capacity: 3 });
    }
    
    // 20 tables for 4 people
    for (let i = 1; i <= 20; i++) {
      tables.push({ tableNumber: `Table-4-${i.toString().padStart(2, '0')}`, capacity: 4 });
    }

    await Table.insertMany(tables);
    console.log('Tables seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding tables:', error);
    process.exit(1);
  }
};

seedTables();
