const userModel = require("../../models/userModel");
const experienceModel = require("../../models/ExperienceModel");

const addExperiencesToUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { experienceId } = req.body;

    const experience = await experienceModel.findById(experienceId);
    if(!experience) {
      return res.status(404).send({
        success : false,
        message : "Experience Not Found"
      })
    }

    user.experience.push(experienceId);

    await user.save();

    res.status(200).send({
      success : true,
      message : "Experience Added to User Successfully",
      user
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Experience for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

const getExperiencesFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId).populate("experience");
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Experience Fetched for User Successfully",
      experience : user.experience
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Experience for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

const deleteExperiencesFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { experienceId } = req.body;

    // const experience = experienceModel.findById(experienceId);
    // if(!experience) {
    //   return res.status(404).send({
    //     success : false,
    //     message : "Experience Not Found"
    //   })
    // }

    const index = user.experience.indexOf(experienceId);
    if(index > -1) {
      user.experience.splice(index, 1);
    }

    res.status(200).send({
      success : true,
      message : "Experience Deleted from User Successfully",
      user
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Experience for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

module.exports = {
  addExperiencesToUsersById,
  getExperiencesFromUsersById,
  deleteExperiencesFromUsersById
}