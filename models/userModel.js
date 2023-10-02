const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  role:{
    type: String,
    enum: ['regular', 'verified', 'moderator', 'admin'],
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
  website:{
    type: String,
  },
  location:{
    type: String,
  },
  dateOfBirth :{
    type: Date,
  },
  gender : {
    type: String,
  },
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
  searchHistory:[
    {
      type: String
    }
  ],

  //Connections Information
  connections:[
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],
  connectionRequests : [
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
  following : [
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],
  subscribed : [
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],
  subscribers:[
    {
      type: mongoose.ObjectId,
      ref: 'User'
    }
  ],
  reputations : [
    {
      author : {
        type : mongoose.ObjectId,
        ref : 'User'
      },
      content : {
        type : String,
        required : true
      },
      likes : [
        {
          type : mongoose.ObjectId,
          ref : 'User'
        }
      ],
    }, {timestamps: true}
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
      type : mongoose.ObjectId,
      ref : 'Experience'
    }
  ],

  //Education
  education:[
    {
      type : mongoose.ObjectId,
      ref : 'Education'
    }
  ],

  //Skills
  skills:[
    {
      type: mongoose.ObjectId,
      ref: 'Skills'
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

  //Newsletter
  newsletter:[
    {
      type: mongoose.ObjectId,
      ref: 'Newsletter'
    }
  ],

  //Gallery
  gallery:[
    {
      type: mongoose.ObjectId,
      ref: 'Gallery'
    }
  ],

  notifications:[
    {
      type: mongoose.ObjectId,
      ref: 'Notification'
    }
  ],

},{timestamps: true})

console.log("User Model -> Working Successfully")
module.exports = mongoose.model('User', userSchema);