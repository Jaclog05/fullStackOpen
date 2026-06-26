const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promisesArray = blogObjects.map(blog => blog.save())

  await Promise.all(promisesArray)
})

test('blogs are returned as json', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id property should be named "id"', async () => {
  const response = await api.get('/api/blogs')
  const databaseBlog = response.body[0]

  assert.strict(Object.keys(databaseBlog).includes("id"));
  assert.strict(!Object.keys(databaseBlog).includes("_id"));
})

after(async () => {
  await mongoose.connection.close()
})