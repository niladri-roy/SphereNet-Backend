const userModel = require("../models/userModel");
const experienceModel = require("../models/ExperienceModel");

const createExperiences = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      })
    }

    const { title , employmentType, company, location, startDate, endDate, description } = req.body;

    const experience = await experienceModel.create({
      title,
      employmentType,
      company,
      location,
      startDate,
      endDate,
      description,
      userId
    });

    res.status(200).send({
      success: true,
      message: "Experience Created Successfully",
      experience
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Experience for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

const getExperiencesById = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const experience = await experienceModel.findById(experienceId);
    if (!experience) {
      return res.status(404).send({
        success: false,
        message: "Experience Not Found"
      })
    }

    res.status(200).send({
      success: true,
      message: "Experience Fetched Successfully",
      experience
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting Experiences for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

const updateExperiencesById = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const experience = await experienceModel.findById(experienceId);
    if (!experience) {
      return res.status(404).send({
        success: false,
        message: "Experience Not Found"
      })
    }

    const { title, employmentType, company, location, startDate, endDate, description } = req.body;

    // Update user's details if provided in the request
    if (title) {
      experience.title = title;
    }
    if (employmentType) {
      experience.employmentType = employmentType;
    }
    if (company) {
      experience.company = company;
    }
    if (location) {
      experience.location = location;
    }
    if (startDate) {
      experience.startDate = startDate;
    }
    if (endDate) {
      experience.endDate = endDate;
    }
    if (description) {
      experience.description = description;
    }

    await experience.save();

    res.status(200).send({
      success: true,
      message: "Experience Updated Successfully",
      experience
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Experience for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

const deleteExperiencesById = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const experience = await experienceModel.findById(experienceId);
    if (!experience) {
      return res.status(404).send({
        success: false,
        message: "Experience Not Found"
      })
    }

    await experienceModel.findByIdAndDelete(experienceId);

    res.status(200).send({
      success: true,
      message: "Experience Deleted Successfully",
      experience
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Experience for User -> Internal Server Error (Experiences Controller)"
    })
  }
}

module.exports = {
  createExperiences,
  getExperiencesById,
  updateExperiencesById,
  deleteExperiencesById
}