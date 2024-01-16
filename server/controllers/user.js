const db = require("../models");
const Post = db.Post;


/* GET ALL POSTS */
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
  
  /* CREATE POST */
const createPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, content, category, summary } = req.body;

        const newPost = await Post.create({
            Title: title,
            Summary: summary,
            Content: content,
            Category: category,
            UserUserID: userId
        })

        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
  
  
module.exports = {
    getAllPosts,
    createPost
};