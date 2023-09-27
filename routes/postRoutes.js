const express = require('express');

const { 
  createPost, 
  getAllPosts,
  deletePost,
  likePost,
  unlikePost,
  getPostById,
  addCommentsToPostsById,
  getCommentsOnPostById,
  deleteCommentOnPostById,
} = require('../controllers/postController');

const { 
  requireSignIn ,
  isAdmin
} = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/', requireSignIn, createPost);

router.get('/', requireSignIn, getAllPosts);
router.get('/:postId', requireSignIn, getPostById);

router.delete('/delete-post/:postId' , deletePost)

router.put('/like/:postId', requireSignIn, likePost);
router.put('/dislike/:postId', requireSignIn, unlikePost);

router.put('/comments/:postId', requireSignIn, addCommentsToPostsById);
router.get('/comments/:postId', requireSignIn, getCommentsOnPostById);
router.patch('/comments/:postId', requireSignIn, deleteCommentOnPostById);

module.exports = router;