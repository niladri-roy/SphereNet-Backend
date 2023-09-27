const userModel = require('../../models/userModel');

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

module.exports = {
  getUsersById
};