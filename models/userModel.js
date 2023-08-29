const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  role:{
    type: String,
    enum: ['regular', 'verified', 'administrator', 'admin'],
    default: 'regular'
  },
  
  //Personal Information
  firstName:{
    type: String,
    required: true,
    max: 255
  },
  lastName:{
    type: String,
    max: 255
  },
  phone:{
    type: String,
  },
  address:{
    type: String,
  },
  website:{
    type: String,
  },
  location:{
    type: String,
  },

  //Connections Information
  connections:[
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],
  followers:[
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],

  //Social-Media Links
  facebookLink:{
    type: String
  },
  twitterLink:{
    type: String
  },
  instagramLink:{
    type: String
  },
  linkedinLink:{
    type: String
  },
  otherLinks:[
    {
      type: String
    }
  ],

  //Profile Information
  headline:{
    type: String,
    max: 255,
  },
  bio:{
    type: String,
    max: 255
  },
  profilePicture:{
    type: String,
  },
  bannerPicture:{
    type: String,
  },

  //Log Information
  username:{
    type: String,
    required: true,
    max: 255,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  uniqueAnswer:{
    type: String,
    required: true,
  },

  //Professional Information
  //Experience
  experience:[
    {
      type: mongoose.ObjectId,
      ref: 'Experience'
    }
  ],

  //Education
  education:[
    {
      type: mongoose.ObjectId,
      ref: 'Education'
    }
  ],

  //Skills
  skills:[
    {
      type: mongoose.ObjectId,
      ref: 'Skill'
    }
  ],

  //Certification
  certification:[
    {
      type: mongoose.ObjectId,
      ref: 'Certification'
    }
  ],

  //Languages
  languages:[
    {
      language: {
        type: String,
      },
      proficiency:{
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Native/Bilingual']
      }
    }
  ],

  //Interests
  interests:[
    {
      type: String
    }
  ],

  //Posts
  posts:[
    {
      type: mongoose.ObjectId,
      ref: 'Post'
    }
  ],

  //Blogs
  blogs:[
    {
      type: mongoose.ObjectId,
      ref: 'Blog'
    }
  ],

  //Projects
  projects:[
    {
      type: mongoose.ObjectId,
      ref: 'Project'
    }
  ],

  //Gallery
  gallery:[
    {
      type: mongoose.ObjectId,
      ref: 'Gallery'
    }
  ],

  profileCreated:{  
    type: Date,
    default: Date.now
  }

})



console.log("User Model -> Working Successfully")
module.exports = mongoose.model('User', userSchema);