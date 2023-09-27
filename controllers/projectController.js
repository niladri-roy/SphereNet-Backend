const projectModel = require('../models/projectModel');
const userModel = require('../models/userModel');

/* 
  create project -> 
  get all projects -> 
  get project by id ->
  delete project -> 
  update project ->
  like project ->
  dislike project ->
  comment on project ->
  delete comment on project ->
  update comment on project ->
  get all comments on project ->
  like comments on project ->
  dislike comments on project ->
*/

const createProject = async (req, res) => {
  try {
    const { author, title, content} = req.body;
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
      content,
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

const getProjectById = async (req, res) => {
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

const deleteProject = async (req, res) => {
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

const updateProject = async (req, res) => {
  try{
    const { projectId } = req.params;
    const { title, content } = req.body;

    const project = await projectModel.findById(projectId)
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    await projectModel.findByIdAndUpdate(projectId, {
      title,
      content
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

const likeProject = async (req, res) => {
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

const dislikeProject = async (req, res) => {
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

const commentOnProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, content } = req.body;

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

    const newComment = {
      author : userId,
      content
    }

    project.comments.push(newComment);
    await project.save();

    res.status(200).send({
      success : true,
      message : "Commented on Project Successfully",
      project
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Commenting on Project -> Internal Server Error",
      error
    })
  }
}

const deleteCommentOnProject = async (req, res) => {
  try {
    const { projectId, commentId } = req.params;
    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    const commentIndex = project.comments.findIndex(
      comment => comment._id.toString() === commentId
    );

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

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Comment on Project -> Internal Server Error",
      error
    })
  }
}

const updateCommentOnProject = async (req, res) => {
  try {
    const { projectId, commentId } = req.params;
    const { content } = req.body;

    const project = await projectModel.findById(projectId);
    if(!project){
      return res.status(400).send({
        success : false,
        message : "Project Not Found"
      })
    }

    const commentIndex = project.comments.findIndex(
      comment => comment._id.toString() === commentId
    );

    if(commentIndex === -1){
      return res.status(400).send({
        success : false,
        message : "Comment Not Found"
      })
    }

    project.comments[commentIndex].content = content;
    await project.save();

    res.status(200).send({
      success : true,
      message : "Comment Updated Successfully",
      project
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Comment on Project -> Internal Server Error",
      error
    })
  }
}

const getAllCommentsOnProject = async (req, res) => {
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
      message : "All Comments on Project Fetched Successfully",
      comments : project.comments
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting All Comments on Project -> Internal Server Error",
      error
    })
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
  likeProject,
  dislikeProject,
  commentOnProject,
  deleteCommentOnProject,
  updateCommentOnProject,
  getAllCommentsOnProject
  
}