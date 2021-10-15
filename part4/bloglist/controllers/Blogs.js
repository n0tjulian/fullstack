const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response,next) => {
  const blogs = await Blog.find({}).populate('user',{username:1,name:1})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response,next) => {
  const blogBody = request.body
  try{
  const user = await request.user
  const blogBodyLikes = typeof request.body.likes==='undefined' ? 0 : blogBody.likes
  const blog = new Blog({
    title:blogBody.title,
    author:blogBody.author,
    url:blogBody.url,
    likes:blogBodyLikes,
    user:user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
  }catch(error){next(error)}
})

blogsRouter.delete('/:id', async (request, response,next) => {
  try{
  const user = await request.user
  console.log(user)
	const blogToDelete = await Blog.findById(request.params.id)
  if(blogToDelete.user.toString() === user._id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json({info:"this blog has been deleted..."})
  }}catch(error){next(error)}
	
})

blogsRouter.put('/:id', async (request,response,next) => {
  const body = request.body._doc
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes:body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id , blog , {new:true})
  console.log(Blog.find({}))
  console.log(updatedBlog)
  response.json(updatedBlog)
})

module.exports = blogsRouter; 