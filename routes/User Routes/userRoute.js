const express = require('express');

const {
  getUsersById,
} = require('../../controllers/User Controllers/userController');

const router = express.Router();

//Get the user by id
router.get('/:userId', getUsersById);

module.exports = router;
