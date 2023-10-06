const mongoose = require('mongoose');
const newsletterSchema = new mongoose.Schema({

/*
  author
  title
  headline
  content
  likes
  comments
  tags
*/

  author : {
    type : mongoose.ObjectId,
    ref : 'User',
  },
  title : {
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

}, {timestamps : true});

const newsletterModel = mongoose.model('Newsletter', newsletterSchema);
module.exports = newsletterModel;