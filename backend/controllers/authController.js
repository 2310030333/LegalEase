// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
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
    res.json({ token, user });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// NEW: Facial recognition login
export const loginWithFace = async (req, res) => {
  try {
    const { username, encoding } = req.body;

    const user = await User.findOne({ username });
    console.log(user);
    if (!user || !user.faceEncoding) {
      return res.status(404).json({ message: 'User not found or no face data' });
    }

    // Call your Python server to verify face
    const response = await axios.post('http://localhost:5001/verify-face', {
      known_encoding: user.faceEncoding,
      unknown_encoding: encoding,
    });

    if (response.data.match) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, user });
    } else {
      return res.status(401).json({ message: 'Face not recognized' });
    }
  } catch (err) {
    console.error('Facial login error:', err);
    res.status(500).json({ message: 'Facial recognition login failed', error: err.message });
  }
};
