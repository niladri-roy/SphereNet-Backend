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
  bannerPicture : {
    type : String,
  },
  title :{
    type : String,
    required : true
  },
  headline : {
    type : String,
  },
  content : {
    type : String,
    required : true
  },
  media : [
    {
      type : String,
    }
  ],
  likes : [
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
      ]
    } , {timestamps : true}
  ],

});

const blogModel = mongoose.model('Blog' , blogSchema);
module.exports = blogModel;