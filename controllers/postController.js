const postModel = require('../models/postModel');
const userModel = require('../models/userModel');

const createPost = async (req, res) => {
  try {
    const { author , title } = req.body;
    const user = await userModel.findById(author);

    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    const newPost = new postModel({
      author,
      title
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

module.exports = {
  createPost,
}