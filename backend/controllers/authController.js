// controllers/authController.js
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Twilio Auth Token
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number
const client = twilio(accountSid, authToken); // Create Twilio client
// Register a new user (with optional face encoding)
export const register = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Files:", req.files); // log uploaded files for debugging

    const {
      username,
      password,
      role,
      fullName,
      phone,
      address,
      yearsOfExperience,
      specialization,
      university,
      graduationYear,
    } = req.body;

    let faceEncoding = req.body.faceEncoding;
    if (typeof faceEncoding === 'string') {
      faceEncoding = JSON.parse(faceEncoding);
    }

    if (!Array.isArray(faceEncoding)) {
      return res.status(400).json({ message: 'Invalid face encoding data' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      username,
      password: hashedPassword,
      role,
      faceEncoding,
      fullName,
      phone,
    };

    // Handle role-specific fields and file uploads
    const files = req.files;

    switch (role) {
      case 'lawyer':
        userData.address = address;
        userData.yearsOfExperience = yearsOfExperience;
        userData.specialization = specialization;

        if (files?.barCertificate?.[0]) {
          userData.barCertificate = files.barCertificate[0].filename;
        } else {
          return res.status(400).json({ message: 'Bar certificate is required for lawyers' });
        }
        break;

      case 'student':
        userData.university = university;
        userData.graduationYear = graduationYear;
        break;

      case 'client':
        userData.address = address;

        if (files?.identityProof?.[0]) {
          userData.identityProof = files.identityProof[0].filename;
        } else {
          return res.status(400).json({ message: 'Identity proof is required for clients' });
        }
        break;

      default:
        return res.status(400).json({ message: 'Invalid role specified' });
    }

    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};




// Login with username and password
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, 
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        profileUpdated: user.profileUpdated,
      }
     });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// NEW: Facial recognition login
export const loginWithFace = async (req, res) => {
  try {
    const { known_encoding, unknown_encoding,username } = req.body;

    const user = await User.findOne({ username });
    console.log(user);
    if (!user || !user.faceEncoding) {
      return res.status(404).json({ message: 'User not found or no face data' });
    }

    // Call your Python server to verify face
    const response = await axios.post('http://localhost:5001/verify-face', {
      known_encoding: known_encoding,
      unknown_encoding: unknown_encoding,
    });

    if (response.data.match) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log(token, "this is token");
      return res.json({ token, 
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
          profileUpdated: user.profileUpdated,
        }
      });
    } else {
      return res.status(401).json({ message: 'Face not recognized' });
    }
  } catch (err) {
    console.error('Facial login error:', err);
    res.status(500).json({ message: 'Facial recognition login failed', error: err.message });
  }
};

// Update lawyer profile
export const updateLawyerDetails = async (req, res) => {
  try {
    const { userId, updatedData } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the fields safely
    if (updatedData.address !== undefined) user.address = updatedData.address;
    if (updatedData.yearsOfExperience !== undefined) user.yearsOfExperience = updatedData.yearsOfExperience;
    if (updatedData.specialization !== undefined) user.specialization = updatedData.specialization;
    if (updatedData.barCertificate !== undefined) user.barCertificate = updatedData.barCertificate;
    if (updatedData.numberOfCases !== undefined) user.numberOfCases = updatedData.numberOfCases;
    if (updatedData.lawFirm !== undefined) user.lawFirm = updatedData.lawFirm;
    if (updatedData.location !== undefined) user.location = updatedData.location;

    user.profileUpdated = true; // mark as onboarded

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};
// Get lawyer details by ID
export const getLawyerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch lawyer details error:', err);
    res.status(500).json({ message: 'Failed to fetch lawyer details', error: err.message });
  }
};
// Get clients assigned to a specific lawyer
export const getClientsForLawyer = async (req, res) => {
  try {
    const { lawyerId } = req.query;
    console.log(lawyerId);
    if (!lawyerId) {
      return res.status(400).json({ message: 'Lawyer ID is required' });
    }

    const clients = await User.find({ 
      role: 'client', 
      lawyerAssigned: lawyerId 
    }).select('-password -faceEncoding'); // Don't send sensitive data
    console.log(clients + "hello");
    res.status(200).json(clients);
  } catch (err) {
    console.error('Fetch clients error:', err);
    res.status(500).json({ message: 'Failed to fetch clients', error: err.message });
  }
};
export const sendVideoConferenceInvite = async (req, res) => {
  let { phoneNumber } = req.body; // Receive phone number from client
  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }
  if (phoneNumber.startsWith('0')) {
    phoneNumber = '+91' + phoneNumber.slice(1); // Remove '0' and add '+91'
  } else {
    return res.status(400).json({ message: 'Invalid phone number format. Ensure it starts with 0.' });
  }
  console.log(req.body);
  try {
    // Send the SMS using Twilio
    const message = await client.messages.create({
      body: 'You have a new video conference invitation. Please join us! https://video-calling-app-1-donw.onrender.com',
      from: twilioPhoneNumber, // Your Twilio phone number
      to: phoneNumber,         // Client's phone number
    });

    // Respond with a success message
    res.status(200).json({ message: 'Video conference invite sent successfully!', sid: message.sid });
  } catch (err) {
    console.log(phoneNumber, "hello");
    console.error('Error sending SMS:', err);
    res.status(500).json({ message: 'Failed to send video conference invite', error: err.message });
  }
};


export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Fetch notifications error:', err);
    res.status(500).json({ message: 'Failed to fetch notifications', error: err.message });
  }
};
export const acceptNotification = async (req, res) => {
  try {
    const { notifId, lawyerId } = req.body;
    console.log(notifId, lawyerId);
    if (!notifId || !lawyerId) {
      return res.status(400).json({ message: 'Notification ID and Lawyer ID are required' });
    }

    const notification = await Notification.findById(notifId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Assuming the notification represents a client wanting to be assigned to a lawyer
    const clientId = notification.from; // the client who requested
    // Update the client to assign the lawyer
    const updatedClient = await User.findByIdAndUpdate(clientId, { lawyerAssigned: lawyerId });
    console.log(updatedClient);
    // Delete the notification after accepting
    {/*await Notification.findByIdAndDelete(notifId);*/}

    res.status(200).json({ message: 'Notification accepted and client assigned to lawyer' });
  } catch (err) {
    console.error('Accept notification error:', err);
    res.status(500).json({ message: 'Failed to accept notification', error: err.message });
  }
};

