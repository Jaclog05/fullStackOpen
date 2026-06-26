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

test('new blog added successfully', async() => {
  const initialBlogsInDB = await api.get('/api/blogs')
  const newBlog = {
    title: "Nuevo Blog",
    author: "Steven Spielberg",
    url: "https://urldeprueba.com",
    likes: 35
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  finalBlogsInDB = await api.get('/api/blogs')
  assert.deepStrictEqual(finalBlogsInDB.body.length, initialBlogsInDB.body.length + 1)

  const blogTitles = finalBlogsInDB.body.map(blog => blog.title)
  assert.strict(blogTitles.includes("Nuevo Blog"))
})

after(async () => {
  await mongoose.connection.close()
})