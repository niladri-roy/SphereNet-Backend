const userModel = require("../../models/userModel");
const educationModel = require("../../models/EducationModel");

const addEducationsToUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { educationId } = req.body;

    const education = educationModel.findById(educationId);
    if(!education) {
      return res.status(404).send({
        success : false,
        message : "Education Not Found"
      })
    }

    user.education.push(educationId);
    await user.save();

    res.status(200).send({
      success : true,
      message : "Education Added to User Successfully",
      educations : user.education
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

const getEducationsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId).populate("education");
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "Education Fetched for User Successfully",
      education : user.education
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Fetching Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

const deleteEducationsFromUsersById = async (req, res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const { educationId } = req.body;

    // const education = educationModel.findById(educationId);
    // if(!education) {
    //   return res.status(404).send({
    //     success : false,
    //     message : "Education Not Found"
    //   })
    // }

    const index = user.education.indexOf(educationId);
    if(index > -1) {
      user.education.splice(index, 1);
    }

    await user.save();

    res.status(200).send({
      success : true,
      message : "Education Deleted from User Successfully",
      user
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Deleting Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

module.exports = {
  addEducationsToUsersById,
  getEducationsFromUsersById,
  deleteEducationsFromUsersById
}