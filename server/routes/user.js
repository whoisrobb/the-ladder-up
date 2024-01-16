const express = require('express');
const { createPost, getAllPosts } = require('../controllers/user');
const router = express.Router();


/* GET ALL POSTS */
router.get('/posts', getAllPosts);

/* CREATE POST */
router.post('/post/create/:userId', createPost);

module.exports = router;