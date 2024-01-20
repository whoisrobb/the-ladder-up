const db = require("../models");
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;


/* GET ALL POSTS */
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                attributes: ['Username'],
            }],
        });
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
        const file = req.file;

        const newPost = await Post.create({
            Title: title,
            Summary: summary,
            Content: content,
            Category: category,
            CoverImage: file.filename,
            UserUserID: userId
        })

        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* GET ONE POST */
//     try {
//         const postId = req.params.postId;
        
//         const post = await Post.findOne({
//             where: { id: postId },
//             // include: [
//             //     {
//             //         model: User,
//             //         as: 'Author'
//             //     },
//             //     {
//             //         model: Like,
//             //         as: 'Likes',
//             //         include: [{
//             //             model: User,
//             //             as: 'LikedBy'
//             //         }]
//             //     },
//             //     {
//             //         model: Comment,
//             //         as: 'Comments',
//             //         include: [{
//             //             model: User,
//             //             as: 'Author'
//             //         }]
//             //     },
//             // ],
//             include: [
//                 { model: User, as: 'Author' },
//                 { model: Like, as: 'Likes', include: [{ model: User, as: 'LikedBy' }] },
//                 { model: Comment, as: 'Comments', include: [{ model: User, as: 'Author' }] },
//             ],      
//         });

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.status(200).json(post);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
const getSinglePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Find the post with associated author and comments
        const post = await Post.findOne({
            where: { PostID: postId },
            include: [
                { model: User },
                { model: Comment, include: [{ model: User }] },
            ],
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* EDIT POST */
const editPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, category, summary } = req.body;
        // const file = req.file;

        const post = await Post.findOne({ where: { PostID: postId } });

        const updatedPost = await post.update({
            Title: title,
            Summary: summary,
            Content: content,
            // CoverImage: file.filename,
            Category: category,
        })

        res.status(201).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* DELETE POST */
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        await Post.destroy({ where: { PostID: postId }});
        res.status(200).json({ message: 'Post deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* CREATING COMMENT */
const createComment = async (req, res) => {
    try {
        const { userId } = req.params;

        const { msg, postId } = req.body;

        const newComment = await Comment.create({
            Content: msg,
            PostPostID: postId,
            UserUserID: userId
        });

        res.status(201).json(newComment);
    } catch (err) {

    }
};

  
module.exports = {
    getAllPosts,
    createPost,
    getSinglePost,
    editPost,
    deletePost,
    createComment
};