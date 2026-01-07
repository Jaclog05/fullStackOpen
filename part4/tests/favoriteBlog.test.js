const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const emptyBlogList = []
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
  ]
  const listWithMultipleBlogs = [
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
    const result = listHelper.favoriteBlog(emptyBlogList)
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert
    .deepStrictEqual(result,
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('of a bigger list is picked correctly', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert
    .deepStrictEqual(result,
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    )
  })
})