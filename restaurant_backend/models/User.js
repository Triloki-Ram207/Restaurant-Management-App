import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  numberOfPersons: {
    type: Number,
    required: true,
    min: 1
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // Adjust regex based on your format
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.model('User', UserSchema);
