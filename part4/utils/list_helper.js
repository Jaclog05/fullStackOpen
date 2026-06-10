const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const reducer = (max, current) => {
    return max.likes > current.likes ? max : current
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length == 0) return null;

  const reducer = (accumulator, post) => {
    const author = post.author;

    accumulator[author] = (accumulator[author] || 0) + 1;
    return accumulator
  };

  const blogCounts = blogs.reduce(reducer, {});

  return Object.keys(blogCounts).reduce(
    (maxAuthor, currentAuthor) => blogCounts[maxAuthor] > blogCounts[currentAuthor]
      ? maxAuthor
      : currentAuthor
  );
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}