import express from 'express';
const router = express.Router();
import Notification from '../models/Notifications.js';
import Appointment from '../models/Appointment.js';

// Send notification
router.post('/send', async (req, res) => {
  try {
    const { from, to, description } = req.body;
    const newNotification = new Notification({ from, to, description });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Get notifications for a lawyer
router.get('/:lawyerId', async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const notifications = await Notification.find({ to: lawyerId }).sort({ createdAt: -1 }).populate('from', 'fullName');
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.patch('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// ✅ Respond to notification (Accept or Reject)
router.patch('/:id/respond', async (req, res) => {
  const { decision } = req.body; // 'Accepted' or 'Rejected'

  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.status = decision;
    await notification.save();

    if (decision === 'Accepted') {
      await Appointment.create({
        client: notification.from,
        lawyer: notification.to,
        status: 'Pending',
      });

      await Notification.create({
        from: notification.to,
        to: notification.from,
        description: 'Your connection request was accepted! Check Appointments.',
      });
    } else if (decision === 'Rejected') {
      await Notification.create({
        from: notification.to,
        to: notification.from,
        description: 'Your connection request was rejected.',
      });
    }

    res.json({ message: 'Response recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to respond to request' });
  }
});

export default router;
