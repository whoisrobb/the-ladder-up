const express = require('express');
const { createPost, getAllPosts, getSinglePost, editPost, deletePost, createComment } = require('../controllers/user');
const upload = require('../controllers/upload');
const router = express.Router();


/* GET ALL POSTS */
router.get('/posts', getAllPosts);

/* CREATE POST */
router.post('/post/create/:userId', upload.single('file'), createPost);

/* GET SINGLE POST */
router.get('/post/:postId', getSinglePost);

/* EDIT POST */
router.put('/post/edit/:postId', editPost);

/* DELETE POST */
router.delete('/post/delete/:postId', deletePost);

/* CREATE COMMENT */
router.post('/post/comment/:userId', createComment);


module.exports = router;