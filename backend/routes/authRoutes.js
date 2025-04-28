import express from 'express';
import { register, login, loginWithFace, updateLawyerDetails } from '../controllers/authController.js';
import multer from 'multer';
import path from 'path';
import { getLawyerDetails } from '../controllers/authController.js';
import { getClientsForLawyer } from '../controllers/authController.js';
import { sendVideoConferenceInvite } from '../controllers/authController.js';
import { getNotifications } from '../controllers/authController.js';
import { acceptNotification } from '../controllers/authController.js';
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'barCertificate') {
      cb(null, 'uploads/barCertificates/');
    } else if (file.fieldname === 'identityProof') {
      cb(null, 'uploads/identityProofs/');
    } else {
      cb(null, 'uploads/others/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File type filter
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
router.post('/update-lawyer-details', updateLawyerDetails);
router.get('/get-lawyer-details/:id', getLawyerDetails);
router.get('/clients', getClientsForLawyer);
router.post('/send-video-conference', sendVideoConferenceInvite);
router.get('/getnotifications',getNotifications);
router.post('/acceptnotifications', acceptNotification);

export default router;
