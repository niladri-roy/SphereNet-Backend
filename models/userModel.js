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
      title: { //Job Title
        type: String,
        required: true,
      },
      company: {
        type: mongoose.ObjectId,
        ref: 'Company',
      },
      location: {
        type: String,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      description: {
        type: String,
      },
    }
  ],

  //Education
  education:[
    {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      grade: {
        type: String,
      },
      description: {
        type: String,
      },
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
      title : {
        type: String,
        required: true,
      },
      organization : {
        type: String,
        required: true,
      },
      dateEarned : {
        type: Date,
        required: true,
      },
      description : {
        type: String,
      },
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