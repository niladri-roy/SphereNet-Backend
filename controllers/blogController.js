const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

/* 
Blog Model ->
  author
  title
  content
  likes
  tags
  comments
*/

const createBlogs = async (req, res) => {
  try{
    const { author , title , content , headline , tags } = req.body;
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
      content,
      headline,
      tags,
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

const getBlogsById = async (req, res) => {
  try{
    const { blogId } = req.params;
    const blog = await blogModel.findById(blogId).populate('author');
    
    if(!blog){
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

const deleteBlogs = async (req, res) => {
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

const updateBlogs = async (req, res) => {
  try{
    const { blogId } = req.params;
    const { title , content , tags } = req.body;

    const blog = await blogModel.findById(blogId);

    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    await blogModel.findByIdAndUpdate(blogId , {
      title,
      content,
      tags
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

const likeBlogs = async (req, res) => {
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

    if(blog.likes.includes(blogId)){
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

const disLikeBlogs = async (req, res) => {
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

const addCommentsToBlogsById = async (req, res) => {
  try{
    const { blogId } = req.params;
    const { commentId } = req.body;

    const blog = await blogModel.findById(blogId);
    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    blog.comments.push(commentId);
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Comment Added to Blog Successfully",
      blog
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Comments to Blogs -> Internal Server Error",
      error
    })
  }
}

const getCommentsOnBlogsById = async (req, res) => {
  try{
    const { blogId } = req.params;

    const blog = await blogModel.findById(blogId);

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
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Comments on Blog -> Internal Server Error",
      error
    })
  }
}

const deleteCommentsFromBlogsById = async (req, res) => {
  try{
    const { blogId } = req.params;
    const { commentId } = req.body;

    const blog = await blogModel.findById(blogId);
    if(!blog){
      return res.status(400).send({
        success : false,
        message : "Blog Not Found"
      })
    }

    const commentIndex = blog.comments.indexOf(commentId);
    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    blog.comments.splice(commentIndex, 1);
    await blog.save();

    res.status(200).send({
      success : true,
      message : "Comment Deleted Successfully",
      blog
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Comments from Blogs -> Internal Server Error",
      error
    })
  }
}


module.exports = {
  createBlogs,
  getAllBlogs,
  getBlogsById,
  deleteBlogs,
  updateBlogs,
  likeBlogs,
  disLikeBlogs,
  addCommentsToBlogsById,
  getCommentsOnBlogsById,
  deleteCommentsFromBlogsById
}