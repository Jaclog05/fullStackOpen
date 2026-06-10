const {test, describe} = require('node:test');
const assert = require('node:assert');

const listHelper = require('../utils/list_helper');

describe('most blogs', () => {
  emptyBlogList = [];
  listWithMultipleBlogs = [
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10
    },
  ]

  test('when list is empty', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    assert.deepStrictEqual(result, null)
  })

  test('of a bigger list is picked correctly', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, "Edsger W. Dijkstra")
  })
})