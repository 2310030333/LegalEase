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
  barCertificate: {type:String},

  // For student
  university: { type: String },
  graduationYear: { type: Number },
  identityProof: {type: String},

  // For client
  // address is reused
}, { timestamps: true }); // Optional: adds createdAt & updatedAt

export default mongoose.model('User', UserSchema);
