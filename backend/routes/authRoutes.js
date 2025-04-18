import express from 'express';
import { register, login, loginWithFace } from '../controllers/authController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file upload (identity proof and bar certificate)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/barCertificates/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

// Routes
router.post(
    '/register',
    upload.fields([
      { name: 'identityProof', maxCount: 1 },
      { name: 'barCertificate', maxCount: 1 },
    ]),
    register
  );
router.post('/login', login);
router.post('/login-face', loginWithFace);

export default router;
