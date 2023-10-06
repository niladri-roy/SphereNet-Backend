const newsletterModel = require('../models/newsletterModel');
const userModel = require('../models/userModel');

/*
  author
  title
  headline
  content
  likes
  comments
  tags
*/

const createNewsletters = async (req, res) => {
  try{
    const { author , title , headline , content , tags } = req.body;
    const user = await userModel.findById(author);

    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    const newNewsletter = new newsletterModel({
      author,
      title,
      headline,
      content,
      tags,
    })

    await newNewsletter.save();
    const newsletter = await newsletterModel.findById(newNewsletter._id).populate('author');
    res.status(200).send({
      success : true,
      message : "Newsletter Created Successfully",
      newsletter
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Creating Newsletter -> Internal Server Error",
      error
    })
  }
}

const getAllNewsletters = async (req , res) => {
  try{
    const newsletters = await newsletterModel
      .find()
      .sort({ createdAt : -1 })
      .populate('author');

    res.status(200).send({
      success : true,
      message : "All Newsletters Fetched Successfully",
      newsletters
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Newsletters -> Internal Server Error",
      error
    })
  }
}

const getNewslettersById = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const newsletter = await newsletterModel
      .findById(newsletterId)
      .populate('author');

    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Newsletter Fetched Successfully",
      newsletter
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Newsletter -> Internal Server Error",
      error
    })
  }
}

const updateNewslettersById = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const { title , headline , content , tags } = req.body;
    const newsletter = await newsletterModel.findById(newsletterId);

    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    if(title){
      newsletter.title = title;
    }
    if(headline){
      newsletter.headline = headline;
    }
    if(content){
      newsletter.content = content;
    }
    if(tags){
      newsletter.tags = tags;
    }

    await newsletter.save();
    res.status(200).send({
      success : true,
      message : "Newsletter Updated Successfully",
      newsletter
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Updating Newsletter -> Internal Server Error",
      error
    })
  }
}

const deleteNewslettersById = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const newsletter = await newsletterModel.findById(newsletterId);

    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    await newsletterModel.findByIdAndDelete(newsletterId);

    res.status(200).send({
      success : true,
      message : "Newsletter Deleted Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Newsletter -> Internal Server Error",
      error
    })
  }
}

const likeNewsletters = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const { userId } = req.body;

    const newsletter = await newsletterModel.findById(newsletterId);
    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    if(newsletter.likes.includes(userId)){
      return res.status(400).send({
        success : false,
        message : "Newsletter Already Liked"
      })
    }

    newsletter.likes.push(userId);
    await newsletter.save();

    res.status(200).send({
      success : true,
      message : "Newsletter Liked Successfully"
    })
  }catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Liking Newsletter -> Internal Server Error",
      error
    })
  }
}

const dislikeNewsletters = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const { userId } = req.body;

    const newsletter = await newsletterModel.findById(newsletterId);
    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    const likeIndex = newsletter.likes.indexOf(userId);
    if(likeIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Liked"
      })
    }

    newsletter.likes.splice(likeIndex , 1);
    await newsletter.save();

    res.status(200).send({
      success : true,
      message : "Newsletter Disliked Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Disliking Newsletter -> Internal Server Error",
      error
    })
  }
}

const addCommentsToNewslettersById = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const { commentId } = req.body;

    const newsletter = await newsletterModel.findById(newsletterId);
    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    newsletter.comments.push(commentId);
    await newsletter.save();

    res.status(200).send({
      success : true,
      message : "Comment Added Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Comment -> Internal Server Error",
      error
    })
  }
}

const getCommentsOnNewslettersById = async (req , res) => {
  try{
    const { newsletterId } = req.params;

    const newsletter = await newsletterModel.findById(newsletterId);
    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Comments Fetched Successfully",
      comments : newsletter.comments
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Comments -> Internal Server Error",
      error
    })
  }
}

const deleteCommentsFromNewslettersById = async (req , res) => {
  try{
    const { newsletterId } = req.params;
    const { commentId } = req.body;

    const newsletter = await newsletterModel.findById(newsletterId);
    if(!newsletter){
      return res.status(400).send({
        success : false,
        message : "Newsletter Not Found"
      })
    }

    const commentIndex = newsletter.comments.indexOf(commentId);
    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    newsletter.comments.splice(commentIndex , 1);
    await newsletter.save();

    res.status(200).send({
      success : true,
      message : "Comment Deleted Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Comment -> Internal Server Error",
      error
    })
  }
}

module.exports = {
  createNewsletters,
  getAllNewsletters,
  getNewslettersById,
  updateNewslettersById,
  deleteNewslettersById,
  likeNewsletters,
  dislikeNewsletters,
  addCommentsToNewslettersById,
  getCommentsOnNewslettersById,
  deleteCommentsFromNewslettersById,
}