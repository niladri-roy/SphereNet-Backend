const express = require('express');

const {
  addPostsToUsersById,
  getPostsFromUsersById,
  deletePostsFromUsersById,
  addBlogsToUsersById,
  getBlogsFromUsersById,
  deleteBlogsFromUsersById,
  addProjectsToUsersById,
  getProjectsFromUsersById,
  deleteProjectsFromUsersById,
  addNewsletterToUserById,
  getNewslettersFromUserById,
  deleteNewsletterFromUserById
} = require('../../controllers/User Controllers/userContentController');

const router = express.Router();

router.put('/:userId/posts', addPostsToUsersById);

router.get('/:userId/posts', getPostsFromUsersById);

router.patch('/:userId/posts', deletePostsFromUsersById);

router.put('/:userId/blogs', addBlogsToUsersById);

router.get('/:userId/blogs', getBlogsFromUsersById);

router.patch('/:userId/blogs', deleteBlogsFromUsersById);

router.put('/:userId/projects', addProjectsToUsersById);

router.get('/:userId/projects', getProjectsFromUsersById);

router.patch('/:userId/projects', deleteProjectsFromUsersById);

router.put('/:userId/newsletters', addNewsletterToUserById);

router.get('/:userId/newsletters', getNewslettersFromUserById);

router.patch('/:userId/newsletters', deleteNewsletterFromUserById);

module.exports = router;