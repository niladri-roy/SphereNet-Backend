const userModel = require('../../models/userModel');

const getUserRole = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      });
    }

    const role = user.role;
    res.status(200).send({
      success: true,
      message: "User Role Fetched Successfully",
      role
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting User Role -> Internal Server Error"
    });
  }
};

console.log("User Role Controller -> Working Successfully");
module.exports = {
  getUserRole
};
