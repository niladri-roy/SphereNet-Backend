const express = require('express');

const {
  createBlogs,
  getAllBlogs,
  getBlogsById,
  deleteBlogs,
  updateBlogs,
  likeBlogs,
  disLikeBlogs,
  addCommentsToBlogsById,
  getCommentsOnBlogsById,
  deleteCommentsFromBlogsById
} = require('../controllers/blogController');

const router = express.Router();

router.post('/', createBlogs);

router.get('/', getAllBlogs);

router.get('/:blogId', getBlogsById);

router.delete('/:blogId', deleteBlogs);

router.put('/:blogId', updateBlogs);

router.put('/:blogId/like', likeBlogs);

router.put('/:blogId/dislike', disLikeBlogs);

router.put('/:blogId/comments', addCommentsToBlogsById);

router.get('/:blogId/comments', getCommentsOnBlogsById);

router.patch('/:blogId/comments', deleteCommentsFromBlogsById);

module.exports = router;