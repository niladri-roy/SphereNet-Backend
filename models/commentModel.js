const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({

  author : {
    type : mongoose.ObjectId,
    ref : 'User',
    required : true
  },

  contentType : {
    type : String,
    required : true,
    enum : ['post' , 'blog' , 'project' , 'newsletter']
  },

  contentId : {
    type : mongoose.ObjectId,
    required : true
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

  parentCommentId : {
    type : mongoose.ObjectId,
    ref : 'Comment'
  }

}, {timestamps: true})

console.log("comment model -> working successfully")
module.exports = mongoose.model('Comment' , commentSchema);