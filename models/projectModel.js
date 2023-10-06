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
  // links : [
  //   {
  //     type : String
  //   }
  // ],
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