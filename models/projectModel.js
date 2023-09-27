const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({

/*
  author
  title
  headline
  problem statement
  content
  solution
  challenges
  results
  links
  Media
  likes
  tags
  comments
*/

  author : {
    type : mongoose.ObjectId,
    ref : 'User',
  },
  title : {
    type : String,
    required : true
  },
  headline : {
    type : String,
  },
  problemStatement : {
    type : String,
  },
  content : {
    type : String,
  },
  solution : {
    type : String,
  },
  challenges : {
    type : String,
  },
  results : {
    type : String,
  },
  links : [
    {
      type : String
    }
  ],
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

},{timestamps : true})

const projectModel = mongoose.model('Project', projectSchema);
module.exports = projectModel;