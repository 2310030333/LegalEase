import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'lawyer', 'client'], required: true },
  faceEncoding: { type: [Number], required: true },

  // Common fields
  fullName: { type: String },
  phone: { type: String },

  // For lawyer
  address: { type: String },
  yearsOfExperience: { type: Number },
  specialization: { type: String },
  barCertificate: { type: String },
  numberOfCases: { type: Number },
  lawFirm: { type: String },
  location: { type: String },

  // For student
  university: { type: String },
  graduationYear: { type: Number },

  // For client
  identityProof: { type: String },

  // Track whether user has updated their profile after first login
  profileUpdated: { type: Boolean, default: false },

  // Assuming 'lawyerAssigned' is a string, storing the lawyer's ID
  lawyerAssigned: { type: String },  // Storing the lawyer ID as a string

}, { timestamps: true });

export default mongoose.model('User', UserSchema);
