const tagModel = require('../models/tagModel');

const createTag = async (req, res) => {
  try {
    const tag = req.body;

    if (!tag) {
      return res.status(400).json({
        status: "fail",
        message: "Tag is required",
      });
    }

    const existingTag = await tagModel.findOne( tag );
    if (existingTag) {
      return res.status(409).json({ // 409 Conflict for tag already existing
        status: "fail",
        message: "Tag Already Exists",
      });
    }

    const newTag = await tagModel.create( tag );
    return res.status(201).json({
      status: "success",
      message: "Tag Created Successfully",
      tag: newTag, // Use 'tag' instead of 'date' for consistency
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Error while creating Tag -> Internal Server Error",
      error: error.message, // Include the error message for debugging
    });
  }
}


const getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.find();
    return res.status(200).json({
      status: "success",
      message: "Tags Fetched Successfully",
      tags,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Error while fetching Tags -> Internal Server Error",
      error: error.message,
    });
  }
}


const getTagById = async (req, res) => {
  try {
    const { tagId } = req.params;
    const tag = await tagModel.findById(tagId);

    if (!tag) {
      return res.status(404).json({ // 404 Not Found for tag not found
        status: "fail",
        message: "Tag Not Found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Tag Fetched Successfully",
      tag,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Error while fetching Tag -> Internal Server Error",
      error: error.message,
    });
  }
}


const updateTagById = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { name } = req.body; // Use 'name' as the field to update

    const existingTag = await tagModel.findById(tagId);

    if (!existingTag) {
      return res.status(404).json({
        status: "fail",
        message: "Tag Not Found",
      });
    }

    // Update the 'name' field of the existing tag
    existingTag.name = name;
    const updatedTag = await existingTag.save();

    return res.status(200).json({
      status: "success",
      message: "Tag Updated Successfully",
      tag: updatedTag,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Error while updating Tag -> Internal Server Error",
      error: error.message,
    });
  }
}


const deleteTagById = async (req, res) => {
  try {
    const { tagId } = req.params;
    const tag = await tagModel.findById(tagId);

    if (!tag) {
      return res.status(404).json({
        status: "fail",
        message: "Tag Not Found",
      });
    }

    await tagModel.findByIdAndDelete(tagId);
    res.status(200).json({
      status: "success",
      message: "Tag Deleted Successfully",
      
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Error while deleting Tag -> Internal Server Error",
      error: error.message,
    });
  }
}


module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
