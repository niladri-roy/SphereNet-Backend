const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

const {
  hashPassword, 
  comparePassword
} = require('../utils/authHelper');

const JWT = require('jsonwebtoken');

const userRegister = async (req, res) => {
  try{
    const { firstName, username, email, password, uniqueAnswer } = req.body;
    //Validation
    if(!firstName){ return res.send({ error : "First Name is Required" }) };
    if(!username){ return res.send({ error : "Username is Required" }) };
    if(!email){ return res.send({ error : "Email is Required" }) };
    if(!password){ return res.send({ error : "Password is Required" }) };
    if(!uniqueAnswer){ return res.send({ error : "Unique Answer is Required" }) };

    //Check if user already exists
    const existingUserEmail = await userModel.findOne({ email });
    if(existingUserEmail){
      return res.status(200).send({
        success : false,
        message : "Email Already Register"
      })
    }

    const existingUserUsername = await userModel.findOne({ username });
    if(existingUserUsername){
      return res.status(200).send({
        success : false,
        message : "Username Already Exists"
      })
    }

    //Hash Password
    const hashedPassword = await hashPassword(password);

    //Create User
    const user = await userModel.create({
      firstName,
      username,
      email,
      password : hashedPassword,
      uniqueAnswer
    })

    res.status(201).send({
      success : true,
      message : "User Registered Successfully",
      user
    })
  
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Internal Server Error",
      error
    })
  }
}

const userLogin = async (req, res) => {
  try{
    const { email, username, password } = req.body;
    //Validation

    if(!email){
      return res.status(400).send({
        success : false,
        message : "Email is Required"
      })
    }

    if(!password){
      return res.status(400).send({
        success : false,
        message : "Password is Required"
      })
    }

    //Check if user exists
    const user = await userModel.findOne({ email });

    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Does Not Exist -> The Email is not Registered"
      })
    }

    //Check if password is correct
    const isPasswordCorrect = await comparePassword(password, user.password);
    if(!isPasswordCorrect){
      return res.status(200).send({
        success : false,
        message : "Incorrect Password"
      })
    }

    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });  

    res.status(200).send({
      success : true,
      message : "User Logged In Successfully",
      user:{
        id: user._id,
        firstName: user.firstName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in LogIn -> Internal Server Error",
      error
    })
  }
}

const forgotPassword = async (req, res) => {
  try{
    const { email, uniqueAnswer, newPassword } = req.body;

    if(!email){
      return res.status(400).send({
        success : false,
        message : "Email is Required"
      })
    }

    if(!uniqueAnswer){
      return res.status(400).send({
        success : false,
        message : "Answer is Required"
      })
    }

    if(!newPassword){
      return res.status(400).send({
        success : false,
        message : "New Password is Required"
      })
    }

    // Check if the user already exists
    const user = await userModel.findOne({ email , uniqueAnswer })

    //Validation
    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Does Not Exist -> The Email is not Registered"
      })
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { 
      password: hashed 
    })

    res.status(200).send({
      success : true,
      message : "Password Changed Successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Something Went Wrong while changing password -> Internal Server Controller Error",
      error
    })
  }
}

//make another controller to update user password


//Update User Post
const addPostToUser = async (req, res) => {  
  try{
    const userId = req.params.userId;
    const { postId } = req.body;

    const user = await userModel.findById(userId);
    if(!user){
      return res.status(400).send({
        success : false,
        message : "User Does Not Exist"
      })
    }

    user.posts.push(postId);
    await user.save();

    res.status(200).send({
      success : true,
      message : "Post Added to User Successfully",
      user
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Adding Post to User -> Internal Server Error",
      error
    })
  }
}

module.exports = { 
  userRegister,
  userLogin,
  forgotPassword,
  addPostToUser
}