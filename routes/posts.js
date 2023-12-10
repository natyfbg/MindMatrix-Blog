const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Adjust the path as necessary

// GET all posts
router.get('/', async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: 'desc' });
  res.status(200).json({ posts });
});

// GET a single post by ID
router.get('/:id', async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.status(200).json({ post });
});

// POST a new post
router.post('/', async (req, res, next) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json({ newPost });
});

// PUT (update) a post by ID
router.put('/:id', async (req, res, next) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
  res.status(200).json({ updatedPost });
});

// DELETE a post by ID
router.delete('/:id', async (req, res, next) => {
  const result = await Post.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Post not found' });
  res.status(200).json({ message: 'Post deleted' });
});

module.exports = router;
