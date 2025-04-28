import express from 'express';
const router = express.Router();
import Appointment from '../models/Appointment.js';

// Get Appointments for a client
router.get('/client/:clientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ client: req.params.clientId }).populate('lawyer', 'fullName');
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get Appointments for a lawyer
router.get('/lawyer/:lawyerId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ lawyer: req.params.lawyerId }).populate('client', 'fullName');
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

export default router;
