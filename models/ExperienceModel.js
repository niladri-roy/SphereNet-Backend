const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    max: 255,
  },
  employmentType: {
    type: String,
    max: 255,
  },
  company: {
    type: String,
    max: 255,
  },
  location: {
    type: String,
    max: 255,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
    max: 255,
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
},{timestamps:true});

console.log("Experience Model -> Working Successfully")
module.exports = mongoose.model('Experience', experienceSchema);