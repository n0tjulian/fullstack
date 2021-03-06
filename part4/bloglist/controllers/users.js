const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response,next) => {
  const body = request.body

  const saltRounds = 10

  if(body.password.length <=3){
      return response.status(400).json({error:'password must be longer'})
  }else{
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  try{
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
    }catch(error){
        // console.log("inside error")
        // console.log(error)
        next(error)
    }
  
}})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  })

module.exports = usersRouter