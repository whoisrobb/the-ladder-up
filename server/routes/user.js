const express = require('express');
const { createPost, getAllPosts } = require('../controllers/user');
const upload = require('../controllers/upload');
const router = express.Router();


/* GET ALL POSTS */
router.get('/posts', getAllPosts);

/* CREATE POST */
router.post('/post/create/:userId', upload.single('file'), createPost);

module.exports = router;