const express = require('express');

const {
  createComments,
  getAllComments,
  getCommentsById,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

const router = express.Router();

// Create Comment
router.post('/', createComments);

// Get all Comments
router.get('/', getAllComments);

// Get Comment By Id
router.get('/:commentId', getCommentsById);

// Update Comment
router.put('/:commentId', updateComment);

//Delete Comment
router.delete('/:commentId', deleteComment);

module.exports = router;