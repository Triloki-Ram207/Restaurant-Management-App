import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import MenuItem from './models/MenuItem.js';
import { categories } from './utils/seedData.js'; // assuming seedData is still in utils

dotenv.config(); // no need for custom path

const seedDatabase = async () => {
  console.log('🚀 Seeding script started...');
  try {
    await connectDB();

    const allItems = Object.entries(categories).flatMap(([category, items]) =>
      items.map(item => ({ ...item, category }))
    );

    await MenuItem.deleteMany();
    await MenuItem.insertMany(allItems);

    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();
