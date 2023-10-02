const express = require('express');

const {
  getUsersById,
  updateUsersById,
} = require('../../controllers/User Controllers/userController');

const router = express.Router();

//Get the user by id
router.get('/:userId', getUsersById);
//Update the user by id
router.put('/:userId', updateUsersById);

module.exports = router;