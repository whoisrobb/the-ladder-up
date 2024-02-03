const db = require("../models");
const { Op } = require('sequelize');
const User = db.User;
const Post = db.Post;
const Comment = db.Comment;



/* SEARCH POST */
const searchPosts = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  try {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          {
            Title: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            Summary: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            Content: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ],
      },
      limit: 5,
    });

    const resultsWithContext = posts.map((post) => {
        const context = {};

        const getSnippet = (text, term) => {
            const index = text.toLowerCase().indexOf(term.toLowerCase());
            const start = Math.max(0, index - 15);
            const end = Math.min(text.length, index + term.length + 15);
            return `...${text.slice(start, end)}...`;
        };
      
        if (post.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
            context.Title = getSnippet(post.Title, searchTerm);
        }
        if (post.Summary.toLowerCase().includes(searchTerm.toLowerCase())) {
            context.Summary = getSnippet(post.Summary, searchTerm);
        }
        if (post.Content.toLowerCase().includes(searchTerm.toLowerCase())) {
            context.Content = getSnippet(post.Content, searchTerm);
        }

    //   return { ...post.toJSON(), context };
      return {
        PostID: post.PostID,
        context,
      };
    });

    res.status(200).json(resultsWithContext);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL POSTS */
/*
const getAllPosts = async (req, res) => {
    try {
        const { category } = req.query;

        let posts;
        if (category) {
            posts = await Post.findAll({
                include: [{
                    model: User,
                    attributes: ['Username'],
                }],
                where: {
                    Category: category,
                },
            });
        } else {
            posts = await Post.findAll({
                include: [{
                    model: User,
                    attributes: ['Username'],
                }],
            });
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
*/
const getAllPosts = async (req, res) => {
    try {
        const { category, page = 1, pageSize = 10 } = req.query;

        const parsedPage = parseInt(page, 10) || 1;
        const parsedPageSize = parseInt(pageSize, 10) || 10;

        const offset = (parsedPage - 1) * parsedPageSize;

        let posts;
        let totalCount;

        if (category) {
            [posts, totalCount] = await Promise.all([
                Post.findAll({
                    include: [{
                        model: User,
                        attributes: ['Username'],
                    }],
                    where: {
                        Category: category,
                    },
                    limit: parsedPageSize,
                    offset: offset,
                }),
                Post.count({
                    where: {
                        Category: category,
                    },
                }),
            ]);
        } else {
            [posts, totalCount] = await Promise.all([
                Post.findAll({
                    include: [{
                        model: User,
                        attributes: ['Username'],
                    }],
                    limit: parsedPageSize,
                    offset: offset,
                }),
                Post.count(),
            ]);
        }

        const totalPages = Math.ceil(totalCount / parsedPageSize);

        res.status(200).json({ posts, totalPages, page: parsedPage });
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
const getSinglePost = async (req, res) => {
    try {
        const postId = req.params.postId;

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
    searchPosts,
    createComment
};