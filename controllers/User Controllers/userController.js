const userModel = require('../../models/userModel');

const getAllUsers = async (req , res) => {
  try{
    const users = await userModel.find({});

    res.status(200).send({
      success : true,
      message : "Users Fetched Successfully",
      users
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Users -> Internal Server Error"
    })
  }
}


const getUsersById = async (req , res) => {
  try{
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    res.status(200).send({
      success : true,
      message : "User Fetched Successfully",
      user
    })

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Users -> Internal Server Error"
    })
  }
}

const updateUsersById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { firstName, lastName, location, dateOfBirth, gender, headline, bio } = req.body;

    // Update user's details if provided in the request
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (location) {
      user.location = location;
    }
    if (dateOfBirth) {
      user.dateOfBirth = dateOfBirth;
    }
    if (gender) {
      user.gender = gender;
    }
    if (headline) {
      user.headline = headline;
    }
    if (bio) {
      user.bio = bio;
    }

    // Save the updated user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Details Updated Successfully",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating User's Details -> Internal Server Error",
      error: error,
    });
  }
};


module.exports = {
  getAllUsers,
  getUsersById,
  updateUsersById
};