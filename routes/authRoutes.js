const express = require('express');

const {
  userRegister, 
  userLogin,
  forgotPassword,
  addPostToUser
} = require('../controllers/userAuthController');

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/forgot-password', forgotPassword);
router.post('/:userId/add-post', addPostToUser);

module.exports = router;