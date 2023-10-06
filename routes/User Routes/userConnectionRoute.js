const express = require('express');

const {
  postFollowers,
  deleteFollowers,
} = require('../../controllers/User Controllers/userConnectionController');

const router = express.Router();

router.put('/:userId/followers', postFollowers);

router.patch('/:userId/followers', deleteFollowers);

module.exports = router;