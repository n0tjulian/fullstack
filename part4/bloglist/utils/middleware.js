const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response,next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request,response,next) => {
  const token = getTokenFrom(request)
  request.token = token
  next()
}

const userExtractor = (request,response,next) => {
  try{
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = User.findById(decodedToken.id)
  request.user = user
  next()
  }catch(error){next(error)}
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
	  return response.status(400).send({
		error: 'malformatted id'
	  })
	} else if (error.name === 'ValidationError') {
    console.log("inside validation error middleware")
	  return response.status(400).send({
		error: error.message 
	  })
	} else if (error.name === 'JsonWebTokenError') {
    logger.error("json web token error")
    return response.status(401).json({error:"json web token error"})
	}else if(error.name==='TokenExpireError'){
    logger.error("token error")
		return response.status(401).json({error:"token expired"})
	}else if(error.name==='MongoServerError'){
    logger.error("duplicate key")
    return response.status(400).json({error:"duplicate key error"})
  }
  
	logger.error(error.message)
  
	next(error)
  }

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}