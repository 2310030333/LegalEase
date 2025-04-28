import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: null }, // Schedule later
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Appointment', AppointmentSchema);
