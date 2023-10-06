const express = require('express');

const {
  createNewsletters,
  getAllNewsletters,
  getNewslettersById,
  updateNewslettersById,
  deleteNewslettersById,
  likeNewsletters,
  dislikeNewsletters,
  addCommentsToNewslettersById,
  getCommentsOnNewslettersById,
  deleteCommentsFromNewslettersById,
} = require('../controllers/newsletterController');

const router = express.Router();

router.post('/', createNewsletters);

router.get('/', getAllNewsletters);

router.get('/:newsletterId', getNewslettersById);

router.put('/:newsletterId', updateNewslettersById);

router.delete('/:newsletterId', deleteNewslettersById);

router.put('/:newsletterId/like', likeNewsletters);

router.put('/:newsletterId/dislike', dislikeNewsletters);

router.put('/:newsletterId/comments', addCommentsToNewslettersById);

router.get('/:newsletterId/comments', getCommentsOnNewslettersById);

router.patch('/:newsletterId/comments', deleteCommentsFromNewslettersById);

module.exports = router;