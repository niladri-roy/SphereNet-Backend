const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  certificationName: {
    type: String,
    required: true,
    max: 255,
  },
  certificationAuthority: {
    type: String,
    required: true,
    max: 255,
  },
  licenseNumber: {
    type: String,
    required: true,
    max: 255,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  credentialId: {
    type: String,
    max: 255,
  },
  credentialUrl: {
    type: String,
    max: 255,
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
},{timestamps:true});

console.log("Certification Model -> Working Successfully")
module.exports = mongoose.model('Certification', certificationSchema);