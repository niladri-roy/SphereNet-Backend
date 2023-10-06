const express = require('express');

const {
  getAllUsers,
  getUsersById,
  updateUsersById,
} = require('../../controllers/User Controllers/userController');

const router = express.Router();

//Get all users
router.get('/', getAllUsers);
//Get the user by id
router.get('/:userId', getUsersById);
//Update the user by id
router.put('/:userId', updateUsersById);

module.exports = router;