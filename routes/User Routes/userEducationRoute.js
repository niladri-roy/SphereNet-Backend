const express = require('express')

const {
  addEducationsToUsersById,
  getEducationsFromUsersById,
  deleteEducationsFromUsersById,
} = require('../../controllers/User Controllers/userEducationController')

const router = express.Router()

router.post('/:userId', addEducationsToUsersById)

router.get('/:userId', getEducationsFromUsersById)

router.patch('/:userId', deleteEducationsFromUsersById)

module.exports = router;