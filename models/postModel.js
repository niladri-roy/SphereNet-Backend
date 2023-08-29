const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  author : {
    type : mongoose.ObjectId,
    ref : 'User',
    required : true
  },

  title : {
    type : String,
    required : true
  },

  content : {
    type : String,
    default : "hi"
  },

  media : [
    {
      type : String
    }
  ],

  likes : [
    {
      type : mongoose.ObjectId,
      ref : 'User'
    }
  ],

  comments : [
    {
      type : mongoose.ObjectId,
      ref : 'Comment'
    }
  ],

  tags : [
    {
      type : String,
    }
  ],

  isPublished : {
    type : Boolean,
    default : true
  },

  publishedAt :{
    type : Date,
    default : Date.now()
  }

} , {timestamps : true} )


console.log("Post Model -> Working Successfully")
module.exports = mongoose.model('Post' , postSchema);