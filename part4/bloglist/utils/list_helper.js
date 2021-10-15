const _ = require('lodash')
const User = require('../models/user')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  const reducer = (sum,blog) => {
    return sum+blog.likes
  }
  return blogs.length === 0 ? 0: blogs.reduce(reducer,0)
}

const maxLikes = (blogs) => {
  const mappedArray = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...mappedArray)
  const maxElement = blogs.find( blog => blog.likes === maxLikes)

  return blogs.length === 0 ? 0 : maxElement
}

const mostBlogs = (blogs) => { //returns the blogger with the most posted blogs
                               //has to store an array of objects (author, number of blogs)
                              //iterates over the bloglist, everytime checking if that author exists in the array of objects, if so increment the numbber of blogs
                              //if not add a new object with 1 blog
  const BlogsAndAuthorObject = {}
  blogs.forEach(blog => {
    if (BlogsAndAuthorObject.hasOwnProperty(blog.author)){
      BlogsAndAuthorObject[blog.author] = BlogsAndAuthorObject[blog.author] + 1
    }else{
      BlogsAndAuthorObject[blog.author] = 1
    }

  })

  const keys = Object.keys(BlogsAndAuthorObject)

  let listOfBlogsAndAuthors = []

  keys.forEach((key,index) => {
    
    let tempObject = {author:key,blogs:BlogsAndAuthorObject[key]}
    
    listOfBlogsAndAuthors.push(tempObject)
  })

  var maxArray = _.maxBy(listOfBlogsAndAuthors,'blogs')

  return listOfBlogsAndAuthors.length === 0 ? 0 : maxArray
}

const authorWithMostLikes = (blogs) => {
  const likesAndAuthorObject = {}
  blogs.forEach(blog => {
    if (likesAndAuthorObject.hasOwnProperty(blog.author)){
      likesAndAuthorObject[blog.author] = likesAndAuthorObject[blog.author] + blog.likes
    }else{
      likesAndAuthorObject[blog.author] = blog.likes
    }

  })
  
  const keys = Object.keys(likesAndAuthorObject)

  let listOfLikesAndAuthors = []

  keys.forEach((key,index) => {
    
    let tempObject = {author:key,likes:likesAndAuthorObject[key]}
    
    listOfLikesAndAuthors.push(tempObject)
  })

  var maxArray = _.maxBy(listOfLikesAndAuthors,'likes')

  return listOfLikesAndAuthors.length === 0 ? 0 : maxArray
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
  module.exports = {
    dummy,totalLikes,maxLikes,mostBlogs,authorWithMostLikes,usersInDb
  }