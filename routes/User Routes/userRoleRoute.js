const express = require('express');

const {
  getUserRole
} = require('../../controllers/User Controllers/userRoleController');

const router = express.Router();

//Get the user role
router.get('/:userId', getUserRole);

module.exports = router;