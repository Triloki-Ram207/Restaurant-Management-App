import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ChefOrder from './models/ChefOrder.js';

dotenv.config();

const chefData = [
  { name: 'Maresh', orders: 0 },
  { name: 'Pritam', orders: 0 },
  { name: 'Yash', orders: 0 },
  { name: 'Tenzen', orders: 0 },
];

const seedChefOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await ChefOrder.deleteMany(); // Optional: clears existing data
    await ChefOrder.insertMany(chefData);

    console.log('Chef orders seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    mongoose.disconnect();
  }
};

seedChefOrders();
