const blogRoutes = require('express').Router()
const Blog = require('../models/blog')

blogRoutes.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRoutes.post('/', async (req, res) => {
  let body = req.body;
  if(!body.likes) {
    body = {...body, likes: 0}
  }

  if(!body.title || !body.url) {
    return res.status(400).json({error: "title or url missing"})
  }

  const blog = new Blog(body)

  const result = await blog.save()
  res.status(201).json(result)
})

module.exports = blogRoutes