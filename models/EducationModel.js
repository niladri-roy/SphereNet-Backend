const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    max: 255,
  },
  degree: {
    type: String,
    max: 255,
  },
  fieldOfStudy: {
    type: String,
    max: 255,
  },
  grade: {
    type: String,
    max: 255,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  description: {
    type: String,
    max: 255,
  },
  media: {
    type: String,
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
},{timestamps:true});

console.log("Education Model -> Working Successfully")
module.exports = mongoose.model('Education', educationSchema);