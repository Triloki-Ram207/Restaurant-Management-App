import mongoose from 'mongoose';

const OrderedItemSchema = new mongoose.Schema({
  totalAveragePreparationTime: {
    type: String,
    required: true
  },
  orderType: {
    type: String,
    required: true
  },
  tableNumber: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['ongoing', 'done'],
    default: 'ongoing'
  },
  totalItems: {
    type: Number,
    required: true
  },
 items: [
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  }
], 
 totalPrice: {
    type: Number,
    required: true
  },

   cookingInstructions: {
    type: String,
    default: ''
  },
  readyAt: {
  type: Date,
  required: true
}

  
}, {
  timestamps: true
});

const OrderedItem = mongoose.model('OrderedItem', OrderedItemSchema);
export default OrderedItem;
