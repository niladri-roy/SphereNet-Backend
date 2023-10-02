const express = require('express');

const {
  userRegister, 
  userLogin,
  forgotPassword,
  addPostToUser,
  findUser,
  deletePostFromUser
} = require('../controllers/userAuthController');

const { 
  requireSignIn, 
  isRegular,
  isVerified,
  isModerator,
  isAdmin,
} = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);

router.get('/user-auth' , requireSignIn , isRegular , (req , res) => {
  res.status(200).send({
    ok : true
  })
})

router.get('/verified-user-auth' , requireSignIn , isVerified , (req , res) => {
  res.status(200).send({
    ok : true
  })
})

router.get('/moderator-auth' , requireSignIn , isModerator , (req , res) => {
  res.status(200).send({
    ok : true
  })
})

router.get('/admin-auth' , requireSignIn , isAdmin , (req , res) => {
  res.status(200).send({
    ok : true
  })
})

router.get('/find-user/:userId', findUser);
router.post('/forgot-password', requireSignIn, forgotPassword);


//Post router for Users
router.post('/:userId/add-post', requireSignIn, addPostToUser);
router.put('/delete-post/:userId/:postId', deletePostFromUser)


module.exports = router;