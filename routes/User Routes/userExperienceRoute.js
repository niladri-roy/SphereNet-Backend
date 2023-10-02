const express = require('express')

const {
  addExperiencesToUsersById,
  getExperiencesFromUsersById,
  deleteExperiencesFromUsersById,
} = require('../../controllers/User Controllers/userExperienceController')

const router = express.Router()

router.post('/:userId', addExperiencesToUsersById)

router.get('/:userId', getExperiencesFromUsersById)

router.patch('/:userId', deleteExperiencesFromUsersById)

module.exports = router;