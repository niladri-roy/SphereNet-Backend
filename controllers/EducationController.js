const userModel = require("../models/userModel");
const educationModel = require("../models/EducationModel");

const createEducations = async (req, res) => {
  try{
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if(!user){
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      })
    }

    const { school, degree, fieldOfStudy, grade, startDate, endDate, description } = req.body;

    const education = await educationModel.create({
      school,
      degree,
      fieldOfStudy,
      grade,
      startDate,
      endDate,
      description,
      userId
    });

    res.status(200).send({
      success: true,
      message: "Education Created Successfully",
      education
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

const getEducationsById = async (req, res) => {
  try{
    const { educationId } = req.params;

    const education = await educationModel.findById(educationId);
    if(!education){
      return res.status(404).send({
        success: false,
        message: "Education Not Found"
      })
    }

    res.status(200).send({
      success: true,
      message: "Education Fetched Successfully",
      education
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Fetching Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

const updateEducationsById = async (req, res) => {
  try{
    
    const { educationId } = req.params;

    const educationFind = await educationModel.findById(educationId);
    if(!educationFind){
      return res.status(404).send({
        success: false,
        message: "Education Not Found"
      })
    }

    const { school, degree, fieldOfStudy, grade, startDate, endDate, description } = req.body;

    const education = await educationModel.findByIdAndUpdate(educationId, {
      school,
      degree,
      fieldOfStudy,
      grade,
      startDate,
      endDate,
      description,
      userId
    }, {new: true});

    res.status(200).send({
      success: true,
      message: "Education Updated Successfully",
      education
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

const deleteEducationsById = async (req, res) => {
  try{
    const { educationId } = req.params;

    const education = await educationModel.findById(educationId);
    if(!education){
      return res.status(404).send({
        success: false,
        message: "Education Not Found"
      })
    }

    await educationModel.findByIdAndDelete(educationId);

    res.status(200).send({
      success: true,
      message: "Education Deleted Successfully",
      education
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Education for User -> Internal Server Error (Educations Controller)"
    })
  }
}

module.exports = {
  createEducations,
  getEducationsById,
  updateEducationsById,
  deleteEducationsById
}