import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }, // New
}, { timestamps: true });

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
export default Notification;
