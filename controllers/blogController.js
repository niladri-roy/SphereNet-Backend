const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

/* 
Blog Model ->
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

const createBlog = async (req, res) => {
  try{
    const { author , title , content } = req.body;
    const user = await userModel.findById(author);

    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    const newBlog = new blogModel({
      author,
      title,
      content
    })

    await newBlog.save();
    const blog = await blogModel.findById(newBlog._id).populate('author');
    res.status(200).send({
      success : true,
      message : "Blog Created Successfully",
      blog
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Creating Blog -> Internal Server Error",
      error
    })
  }
}

const getAllBlogs = async (req , res) => {
  try{
    const blogs = await blogModel
      .find()
      .sort({ createdAt : -1 })
      .populate('author');

    res.status(200).send({
      success : true,
      message : "All Blogs Fetched Successfully",
      blogs
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting All Blogs -> Internal Server Error",
      error
    })
  }
}

const getBlogById = async (req, res) => {
  try{
    const { postId } = req.params;
    const blog = await blogModel
      .findById(postId)
      .populate('author');
    
    if(!post){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Blog Fetched Successfully",
      blog
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Blog By Id -> Internal Server Error",
      error
    })
  }
}

const deleteBlog = async (req, res) => {
  try{
    const { blogId } = req.params;
    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    await blogModel.findByIdAndDelete(blogId);

    res.status(200).send({
      success : true,
      message : "Blog Deleted Successfully"
    })

  } catch ( error ) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Blog -> Internal Server Error",
      error
    })
  }
}

const updateBlog = async (req, res) => {
  try{
    const { blogId } = req.params;
    const { title , content } = req.body;

    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    await blogModel.findByIdAndUpdate(blogId , {
      title,
      content
    }, { new : true })

    const updatedBlog = await blogModel.findById(blogId).populate('author');

    res.status(200).send({
      success : true,
      message : "Blog Updated Successfully",
      updatedBlog
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Updating Blog -> Internal Server Error",
      error
    })
  }
}

const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { userId } = req.body;

    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    if(post.likes.includes(blogId)){
      return res.status(400).send({
        success : false,
        message : "Blog Already Liked"
      })
    }

    blog.likes.push(userId);
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Blog Liked Successfully",
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Liking Blog -> Internal Server Error",
      error
    })
  }
}

const disLikeBlog = async (req, res) => {
  try{
    const { blogId } = req.params;
    const { userId } = req.body;

    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    const likeIndex = blog.likes.indexOf(userId);
    if(likeIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Blog Not Liked"
      })
    }

    blog.likes.splice(likeIndex, 1);
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Blog un-liked successfully"
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Internal Server Error",
      error
    })
  }
}

const commentOnBlog = async (req , res) => {
  try{
    const { blogId } = req.params;
    const { userId , content } = req.body;

    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    const comment = {
      author : userId,
      content
    }

    blog.comments.push(comment);
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Commented on Blog Successfully",
      blog
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Commenting on Blog -> Internal Server Error",
      error
    })
  }
}

const deleteComment = async (req , res) => {
  try{
    const { blogId , commentId } = req.params;
    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    const commentIndex = blog.comments.findIndex(
      comment => comment._id.toString() === commentId
    )

    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    blog.comments.splice(commentIndex , 1);
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Comment Deleted Successfully",
      blog
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Internal Server Error",
      error
    })
  }
}

const updateComment = async (req , res) => {
  try{
    const { blogId , commentId } = req.params;
    const { content } = req.body;

    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    const commentIndex = blog.comments.findIndex(
      comment => comment._id.toString() === commentId
    )

    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    blog.comments[commentIndex].content = content;
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Comment Updated Successfully",
      blog
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Internal Server Error",
      error
    })
  }
}

const getAllCommentsOnBlogById = async (req , res) => {
  try{
    const { blogId } = req.params;
    const blog = await blogModel
      .findById(blogId)
      .populate('comments.author');

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Comments Fetched Successfully",
      comments : blog.comments
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Internal Server Error",
      error
    })
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
  likeBlog,
  disLikeBlog,
  commentOnBlog,
  deleteComment,
  updateComment,
  getAllCommentsOnBlogById,

}