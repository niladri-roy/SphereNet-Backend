const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');

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

const createProjects = async (req, res) => {
  try {
    const { author, title, headline , problemStatement , content , solution , challenges , results , tags } = req.body;
    const user = await userModel.findById(author);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found"
      })
    }

    const newProject = new projectModel({
      author,
      title,
      headline,
      problemStatement,
      content,
      solution,
      challenges,
      results,
      tags,
    })

    await newProject.save();

    const project = await projectModel.findById(newProject._id).populate('author');
    res.status(200).send({
      success: true,
      message: "Project Created Successfully",
      project
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Project -> Internal Server Error",
      error
    })
  }
}

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel
      .find()
      .sort({ createdAt: -1 })
      .populate('author');

    res.status(200).send({
      success: true,
      message: "All Projects Fetched Successfully",
      projects
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting All Projects -> Internal Server Error",
      error
    })
  }
}

const getProjectsById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projectModel
      .findById(projectId)
      .populate('author');

    if (!project) {
      return res.status(400).send({
        success: false,
        message: "Project Not Found"
      })
    }

    res.status(200).send({
      success: true,
      message: "Project Fetched Successfully",
      project
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Project by Id -> Internal Server Error",
      error
    })
  }
}

const deleteProjects = async (req, res) => {
  try{
    const { projectId } = req.params;
    const project = await projectModel.findById(projectId);

    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    await projectModel.findByIdAndDelete(projectId);

    res.status(200).send({
      success : true,
      message : "Project Deleted Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Project -> Internal Server Error",
      error
    })
  }
}

const updateProjects = async (req, res) => {
  try{
    const { projectId } = req.params;
    const { title, content , headline , problemStatement , solution , challenges , results , tags } = req.body;

    const project = await projectModel.findById(projectId)
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    await projectModel.findByIdAndUpdate(projectId, {
      title,
      content,
      headline,
      problemStatement,
      solution,
      challenges,
      results,
      tags
    }, { new : true })

    res.status(200).send({
      success : true,
      message : "Project Updated Successfully",
      project
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Project -> Internal Server Error",
      error
    })
  }
}

const likeProjects = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    const user = await userModel.findById(userId);
    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    if(project.likes.includes(userId)){
      return res.status(400).send({
        success : false,
        message : "Project Already Liked by User"
      })
    }

    project.likes.push(userId);
    await project.save();

    res.status(200).send({
      success : true,
      message : "Project Liked Successfully",
      project
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Liking Project -> Internal Server Error",
      error
    })
  }
}

const dislikeProjects = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    const user = await userModel.findById(userId);
    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Not Found"
      })
    }

    const LikeIndex = project.likes.indexOf(userId);
    if(LikeIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Project Not Liked by User"
      })
    }

    project.likes.splice(LikeIndex , 1);
    await project.save();

    res.status(200).send({
      success : true,
      message : "Project Disliked Successfully",
      project
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Disliking Project -> Internal Server Error",
      error
    })
  }
}

const addCommentsToProjectsById = async (req, res) => {
  try{
    const { projectId } = req.params;
    const { commentId } = req.body;

    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    project.comments.push(commentId);
    await project.save();

    res.status(200).send({
      success : true,
      message : "Comment Added Successfully",
      project
    })
  } catch (error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Adding Comment -> Internal Server Error",
      error
    })
  }
}

const getCommentsOnProjectsById = async (req, res) => {
  try{
    const { projectId } = req.params;

    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Comments Fetched Successfully",
      comments : project.comments
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

const deleteCommentsOnProjectsById = async (req, res) => {
  try{
    const { projectId } = req.params;
    const { commentId } = req.body;

    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    const commentIndex = project.comments.indexOf(commentId);
    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    project.comments.splice(commentIndex , 1);
    await project.save();

    res.status(200).send({
      success : true,
      message : "Comment Deleted Successfully",
      project
    })
  } catch (error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Comment -> Internal Server Error",
      error
    })
  }
}


module.exports = {
  createProjects,
  getAllProjects,
  getProjectsById,
  deleteProjects,
  updateProjects,
  likeProjects,
  dislikeProjects,
  addCommentsToProjectsById,
  getCommentsOnProjectsById,
  deleteCommentsOnProjectsById  
}