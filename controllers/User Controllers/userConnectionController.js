//user Connection Controller
const userModel = require('../../models/userModel');

const postFollowers = async (req, res) => {
  try{

    const { userId } = req.params;
    const { followerId } = req.body;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const follower = await userModel.findById(followerId);
    if(!follower) {
      return res.status(404).send({
        success : false,
        message : "Follower Not Found"
      })
    }

    user.followers.push(followerId);
    follower.following.push(userId);

    await user.save();
    await follower.save();

    res.status(200).send({
      success : true,
      message : "Follower Added Successfully",
      user
    })

  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Users -> Internal Server Error"
    })
  }
}

const deleteFollowers = async (req, res) => {
  try{

    const { userId } = req.params;
    const { followerId } = req.body;

    const user = await userModel.findById(userId);
    if(!user) {
      return res.status(404).send({
        success : false,
        message : "User Not Found"
      })
    }

    const follower = await userModel.findById(followerId);
    if(!follower) {
      return res.status(404).send({
        success : false,
        message : "Follower Not Found"
      })
    }

    user.followers.pull(followerId);
    follower.following.pull(userId);

    await user.save();
    await follower.save();

    res.status(200).send({
      success : true,
      message : "Follower Deleted Successfully",
      user
    })

  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Getting Users -> Internal Server Error"
    })
  }
}


module.exports = {
  postFollowers,
  deleteFollowers,
}

