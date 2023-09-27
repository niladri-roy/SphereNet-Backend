const postModel = require('../models/postModel');
const userModel = require('../models/userModel');


const createPost = async (req, res) => {
  try {
    const { author , title , content , tags } = req.body;
    const user = await userModel.findById(author);

    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    const newPost = new postModel({
      author,
      title,
      content,
      tags,
    })

    await newPost.save();

    const post = await postModel.findById(newPost._id).populate('author');
    res.status(200).send({
      success: true,
      message: "Post Created Successfully",
      post
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Post -> Internal Server Error",
      error
    })
  }
}

const getAllPosts = async (req , res) => {
  try{
    const posts = await postModel
      .find()
      .sort({ createdAt : -1 })
      .populate('author');

    res.status(200).send({
      success : true,
      message : "All Posts Fetched Successfully",
      posts
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting All Posts -> Internal Server Error",
      error
    })
  }
}

const getPostById = async (req , res) => {
  try{
    const { postId } = req.params;

    const post = await postModel
      .findById(postId)
      .populate('author');

    if(!post){
      return res.status(400).send({
        success : false,
        message : "Post Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Post Fetched Successfully",
      post
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Single Post -> Internal Server Error",
      error
    })
  }
}

//Get Photo -> Will create latter

const deletePost = async (req , res) => {
  try{
    const { postId } = req.params;
    const post = await postModel.findById(postId);

    if(!post){
      return res.status(400).send({
        success : false,
        message : "Post Not Found"
      })
    }

    await postModel.findByIdAndDelete(postId);

    res.status(200).send({
      success : true,
      message : "Post Deleted Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Post -> Internal Server Error",
      error
    })
  }
}

const updatePost = async (req , res) => {
  try{
    const { postId } = req.params;

    const { title , content } = req.body;
    const post = await postModel.findByIdAndUpdate(
      postId , 
      {
        title,
        content,
      } , { new : true }
  );

    await post.save();

    res.status(200).send({
      success : true,
      message : "Post Updated Successfully",
      post
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Post -> Internal Server Error",
      error
    })
  }
}

const likePost = async (req , res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body; // Assuming you have the user's ID

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ success: false, message: 'You already liked this post' });
    }

    // Add the user's ID to the post's likes array
    post.likes.push(userId);
    await post.save();

    return res.status(200).json({ success: true, message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

const unlikePost = async (req , res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body; // Assuming you have the user's ID

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Check if the user already liked the post
    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res.status(400).json({ success: false, message: 'You have not liked this post' });
    }

    // Remove the user's ID from the post's likes array
    post.likes.splice(likeIndex, 1);
    await post.save();

    return res.status(200).json({ success: true, message: 'Post un-liked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

const addCommentsToPostsById = async(req, res) => {
  try{
    const { postId } = req.params;
    const { commentId } = req.body;

    const post = await postModel.findById(postId);
    if(!post){
      return res.status(400).send({
        success : false,
        message : "Post Not Found"
      })
    }

    post.comments.push(commentId);
    await post.save();

    res.status(200).send({
      success : true,
      message : "Comment Added to Post Successfully",
      post
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Adding Comments to Posts -> Internal Server Error",
      error
    })
  }
}

const getCommentsOnPostById = async(req,res) => {
  try{
    const { postId } = req.params;

    const post = await postModel.findById(postId)

    if(!post){
      return res.status(400).send({
        success : false,
        message : "Post Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Comments Fetched Successfully",
      comments : post.comments
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Comments on Posts -> Internal Server Error",
      error
    })
  }
}

const deleteCommentOnPostById = async(req , res)=> {
  try{
    const { postId } = req.params;
    const { commentId } = req.body;

    const post = await postModel.findById(postId);
    if(!post){
      return res.status(400).send({
        success : false,
        message : "Post Not Found"
      })
    }

    const commentIndex = post.comments.findIndex(
      comment => comment._id.toString() === commentId
    );

    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    post.comments.splice(commentIndex , 1);
    await post.save();

    res.status(200).send({
      success : true,
      message : "Comment Deleted Successfully",
      post
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Comments on Posts -> Internal Server Error",
      error
    })
  }
}



module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
  addCommentsToPostsById,
  getCommentsOnPostById,
  deleteCommentOnPostById,
}