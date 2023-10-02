const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
    max: 255,
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
},{timestamps:true});

console.log("Skills Model -> Working Successfully")
module.exports = mongoose.model('Skills', skillsSchema);