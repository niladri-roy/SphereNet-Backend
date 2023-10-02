const express = require('express');

const {
  createExperiences,
  getExperiencesById,
  updateExperiencesById,
  deleteExperiencesById,
} = require('../controllers/ExperienceController');

const router = express.Router();

router.post('/', createExperiences);

router.get('/:experienceId', getExperiencesById);

router.patch('/:experienceId', updateExperiencesById);

router.delete('/:experienceId', deleteExperiencesById);

module.exports = router;