import mongoose from 'mongoose';

const chefOrderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  orders: { type: Number, default: 0 },
});

const ChefOrder = mongoose.model('ChefOrder', chefOrderSchema);
export default ChefOrder;