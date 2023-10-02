const express = require('express')

const {
  createEducations,
  getEducationsById,
  updateEducationsById,
  deleteEducationsById,
} = require('../controllers/EducationController')

const router = express.Router()

router.post('/', createEducations)

router.get('/:educationId', getEducationsById)

router.patch('/:educationId', updateEducationsById)

router.delete('/:educationId', deleteEducationsById)

module.exports = router;