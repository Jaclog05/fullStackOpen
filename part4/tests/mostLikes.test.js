const { test, describe } = require('node:test');
const assert = require('node:assert');

const list_helper = require('../utils/list_helper');

describe('most likes', () => {
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
    const result = list_helper.mostLikes(emptyBlogList);
    assert.deepStrictEqual(result, null);
  })

  test('of a bigger list is picked correctly', () => {
    const result = list_helper.mostLikes(listWithMultipleBlogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
  })
})