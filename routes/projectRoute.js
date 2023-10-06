const express = require('express');

const {
  createProjects,
  getAllProjects,
  getProjectsById,
  deleteProjects,
  updateProjects,
  likeProjects,
  dislikeProjects,
  addCommentsToProjectsById,
  getCommentsOnProjectsById,
  deleteCommentsOnProjectsById
} = require('../controllers/projectController');

const router = express.Router();

router.post('/', createProjects);

router.get('/', getAllProjects);

router.get('/:projectId', getProjectsById);

router.delete('/:projectId', deleteProjects);

router.put('/:projectId', updateProjects);

router.put('/:projectId/like', likeProjects);

router.put('/:projectId/dislike', dislikeProjects);

router.put('/:projectId/comments', addCommentsToProjectsById);

router.get('/:projectId/comments', getCommentsOnProjectsById);

router.patch('/:projectId/comments', deleteCommentsOnProjectsById);

module.exports = router;