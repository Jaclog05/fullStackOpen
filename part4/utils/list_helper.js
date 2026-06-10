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

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null;

  const reducer = (accumulator, post) => {
    const {author, likes} = post;
    accumulator[author] = (accumulator[author] || 0) + likes;
    return accumulator
  }

  const countLikesObj = blogs.reduce(reducer, {});

  const [ author, likes ] = Object.entries(countLikesObj).reduce(
    (mostLikedEntry, currentEntry) => mostLikedEntry[1] > currentEntry[1]
      ? mostLikedEntry
      : currentEntry
  )

  return { author, likes };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}