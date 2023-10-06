const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({

  author : {
    type : mongoose.ObjectId,
    ref : 'User',
    required : true
  },

  content : {
    type : String,
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
      type : mongoose.ObjectId,
      ref : 'Tag'
    }
  ],

} , {timestamps : true} )


console.log("Post Model -> Working Successfully")
module.exports = mongoose.model('Post' , postSchema);