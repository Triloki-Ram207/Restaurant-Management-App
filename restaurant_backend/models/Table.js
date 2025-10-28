import mongoose from 'mongoose';

const TableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  chairs: { type: Number, required: true, min: 2 },
  reserved: { type: Boolean, default: false },

}, { timestamps: true });

const Table = mongoose.model('Table', TableSchema);
export default Table;
