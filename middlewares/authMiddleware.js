const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

const dotenv = require('dotenv');
dotenv.config();

const requireSignIn = async (req, res, next) => {
  try{
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = await userModel.findById(decode._id);
    next();

  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Internal Server Error",
      error
    })
  }
}

const isRegular = async (req, res, next) => {
  try{
    const user = await userModel.findById(req.user._id);
    if(user.role !== "regular"){
      return res.status(401).send({
        success : false,
        message : "User Not Regular -> UnAuthorized Access"
      })
    } else {
        next();
    }
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Regular User Middleware  -> Internal Server Error",
      error
    })
  }
}

const isVerified = async (req, res, next) => {
  try{
    const user = await userModel.findById(req.user._id);
    if(user.role !== "verified"){
      return res.status(401).send({
        success : false,
        message : "User Not Verified -> UnAuthorized Access"
      })
    } else {
        next();
    }
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Verified User Middleware  -> Internal Server Error",
      error
    })
  }
}

const isModerator = async (req, res, next) => {
  try{
    const user = await userModel.findById(req.user._id);
    if(user.role !== "moderator"){
      return res.status(401).send({
        success : false,
        message : "User Not Administrator -> UnAuthorized Access"
      })
    } else {
      next();
    }
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Administrator Middleware  -> Internal Server Error",
      error
    })
  }
}

const isAdmin = async (req, res, next) => {
  try{
    console.log(req.user)

    const user = await userModel.findById(req.user._id);
    if(user.role !== "admin"){
      return res.status(401).send({
        success : false,
        message : "User Not Admin -> UnAuthorized Access"
      })
    } else {
      next();
    }
  } catch(error) {
    console.log(error);
    res.status(500).send({
      success : false,
      message : "Error in Admin Middleware  -> Internal Server Error",
      error
    })
  }
}

module.exports = {
  requireSignIn,
  isRegular,
  isVerified,
  isModerator,
  isAdmin,
}