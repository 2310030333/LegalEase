import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();

// Set the maximum request body size to 50MB
app.use(express.json({ limit: '50mb' })); // Increase payload size limit
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/lawyer', lawyersearch);
app.use('/api/notifications', notificationRoutes);
app.use('/api/appointments', appointmentRoutes);


mongoose.connect("mongodb+srv://2310030333:chinni12@cluster0.tzyfxzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));
