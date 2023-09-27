const express = require('express');
const {
  createTag,
  getAllTags,
  getTagById,
  deleteTagById,
  updateTagById,
} = require('../controllers/tagController');

const router = express.Router();

//Create a Tag
router.post('/', createTag);

//Get all Tags
router.get('/', getAllTags);

//Get a Tag by Id
router.get('/:tagId', getTagById);

//Update a Tag by Id
router.put('/:tagId', updateTagById);

//Delete a Tag by Id
router.delete('/:tagId', deleteTagById);


module.exports = router;