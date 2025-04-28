import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  notifType: {
    type: String,
    required: true, // Example: "Invitation"
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The sender (client)
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The receiver (lawyer)
  },
  notifDesc: {
    type: String,
    required: true, // Example: "You are wanted for a case!"
  },
  read: {
    type: Boolean,
    default: false, // Initially false
  },
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
