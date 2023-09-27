const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');

//create comment
const createComments = async (req, res) => {
  try{

    const { author , contentType , contentId , content } = req.body;

    const user = await userModel.findById(author);
    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    if(!content){
      return res.status(400).send({
        success : false,
        message : "Content is Required"
      })
    }

    const comment = new commentModel({
      author,
      contentType,
      contentId,
      content
    })

    await comment.save();
    res.status(200).send({
      success: true,
      message: "Comment Created Successfully",
      comment
    })

  } catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Comment -> Internal Server Error",
      error
    })
  }
}

//get all comments
const getAllComments = async (req , res) => {
  try {
    const comments = await commentModel
      .find()
      .sort({ createdAt : -1 })

    res.status(200).send({
      success : true,
      message : "All Comments Fetched Successfully",
      comments
    })

  } catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting All Comments -> Internal Server Error",
      error
    })
  }
}

//get comments
const getCommentsById = async (req , res) => {
  try{

    const { commentId } = req.params;

    const comment = await commentModel
      .findById(commentId)
      .populate('author' , '_id')

    if(!comment){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }    

    res.status(200).send({
      success: true,
      message: "Comment Fetched Successfully",
      comment
    })

  } catch (error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Comments -> Internal Server Error",
      error
    })
  }
}

const updateComment = async(req, res) => {
  try{
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await commentModel.findById(commentId);
    if(!comment){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    const newComment = await commentModel.findByIdAndUpdate(commentId , {
      content
    })

    await newComment.save();

    res.status(200).send({
      success: true,
      message: "Comment Updated Successfully",
      newComment
    })


  } catch (error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Comments -> Internal Server Error",
      error
    })
  }
}

const deleteComment = async(req, res) => {
  try{
    const { commentId } = req.params;

    const comment = await commentModel.findById(commentId);
    if(!comment){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    await commentModel.findByIdAndDelete(commentId);

    res.status(200).send({
      success: true,
      message: "Comment Deleted Successfully",
    })

  } catch (error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Comments -> Internal Server Error",
      error
    })
  }
}



module.exports = {
  createComments,
  getAllComments,
  getCommentsById,
  updateComment,
  deleteComment
}