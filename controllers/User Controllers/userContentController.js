const userModels = require('../../models/userModel');
const blogModels = require('../../models/blogModel');

const addPostsToUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { postId } = req.body;

    user.posts.push(postId);
    await user.save();

    res.status(200).send({
      success : true,
      message : "Post Added to User Successfully",
      posts : user.posts
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Post for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const getPostsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId).populate('posts');
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Posts Fetched Successfully",
      posts : user.posts
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Posts for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const deletePostsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { postId } = req.body;

    const index = user.posts.indexOf(postId);
    if(index > -1) {
      user.posts.splice(index, 1);
    }

    await user.save();

    res.status(200).send({
      success : true,
      message : "Post Deleted from User Successfully",
      posts : user.posts
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Post for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const addBlogsToUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { blogId } = req.body;

    user.blogs.push(blogId);
    await user.save();

    res.status(200).send({
      success : true,
      message : "Blog Added to User Successfully",
      blogs : user.blogs
    })


  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Blog for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const getBlogsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId).populate('blogs');
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Blogs Fetched Successfully",
      blogs : user.blogs
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Blogs for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const deleteBlogsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { blogId } = req.body;

    const index = user.blogs.indexOf(blogId);
    if(index > -1) {
      user.blogs.splice(index, 1);
    }

    await user.save();

    res.status(200).send({
      success : true,
      message : "Blog Deleted from User Successfully",
      blogs : user.blogs
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Blog for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const addProjectsToUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { projectId } = req.body;

    user.projects.push(projectId);
    await user.save();

    res.status(200).send({
      success : true,
      message : "Project Added to User Successfully",
      projects : user.projects
    })
  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Project for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const getProjectsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId).populate('projects');
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Projects Fetched Successfully",
      projects : user.projects
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Projects for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const deleteProjectsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { projectId } = req.body;

    const index = user.projects.indexOf(projectId);
    if(index > -1) {
      user.projects.splice(index, 1);
    }

    await user.save();

    res.status(200).send({
      success : true,
      message : "Project Deleted from User Successfully",
      projects : user.projects
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Project for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const addNewsletterToUserById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { newsletterId } = req.body;

    user.newsletter.push(newsletterId);
    await user.save();

    res.status(200).send({
      success : true,
      message : "Newsletter Added to User Successfully",
      newsletters : user.newsletter
    })
  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Newsletter for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const getNewslettersFromUserById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId).populate('newsletters');
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Newsletters Fetched Successfully",
      newsletters : user.newsletter
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Newsletters for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

const deleteNewsletterFromUserById = async (req, res) => {
  try{
    const { userId } = req.params;
    const user = await userModels.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { newsletterId } = req.body;

    const index = user.newsletter.indexOf(newsletterId);
    if(index > -1) {
      user.newsletter.splice(index, 1);
    }

    await user.save();

    res.status(200).send({
      success : true,
      message : "Newsletter Deleted from User Successfully",
      newsletters : user.newsletter
    })

  } catch(error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Newsletter for User -> Internal Server Error (Blogs Controller)"
    })
  }
}

module.exports = {
  addPostsToUsersById,
  getPostsFromUsersById,
  deletePostsFromUsersById,
  addBlogsToUsersById,
  getBlogsFromUsersById,
  deleteBlogsFromUsersById,
  addProjectsToUsersById,
  getProjectsFromUsersById,
  deleteProjectsFromUsersById,
  addNewsletterToUserById,
  getNewslettersFromUserById,
  deleteNewsletterFromUserById
}