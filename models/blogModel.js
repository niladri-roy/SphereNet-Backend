const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({

/*
  author
  bannerPicture
  title
  headline
  content
  Media
  likes
  tags
  comments
*/
  author : {
    type : mongoose.ObjectId,
    ref : 'User',
  },
  title :{
    type : String,
  },
  headline : {
    type : String,
  },
  content : {
    type : String,
  },
  likes : [
    {
      type : mongoose.ObjectId,
      ref : 'User'
    }
  ],
  upVote : [
    {
      type : mongoose.ObjectId,
      ref : 'User'
    }
  ],

  downVote : [
    {
      type : mongoose.ObjectId,
      ref : 'User'
    }
  ],

  tags : [
    {
      type : mongoose.ObjectId,
      ref : 'Tag'
    }
  ],
  comments : [
    {
      type : mongoose.ObjectId,
      ref : 'Comment'
    }
  ],

} , { timestamps : true });

const blogModel = mongoose.model('Blog' , blogSchema);
module.exports = blogModel;