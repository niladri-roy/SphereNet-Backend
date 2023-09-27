const mongoose = require('mongoose');
const newsletterSchema = new mongoose.Schema({

/*
  author
  bannerPicture
  title
  headline
  content
  Media
  likes
  comments
*/

  author : {
    type : mongoose.ObjectId,
    ref : 'User',
    required : true
  },
  bannerPicture : {
    type : String,
  },
  title : {
    type : String,
    required : true
  },
  headline : {
    type : String,
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
  tags : [
    {
      type : mongoose.ObjectId,
      ref : 'Tag'
    }
  ],

}, {timestamps : true});

const NewsletterModel = mongoose.model('Newsletter', newsletterSchema);
module.exports = NewsletterModel;