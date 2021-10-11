/* eslint-disable no-undef */

const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to:' , url)

mongoose.connect(url).then(result => {
	console.log('result' , result)
	console.log('connected to mongoDB')
}).catch((error) => {
	console.log('error connecting to mongodb' , error.message)
})

const personSchema = new mongoose.Schema({
	name: {
		type:String,
		minLength:3,
		required:true,
		unique:true
	},
	number: {
		type:String,
		minLength:8,
		required:true
	},
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person',personSchema)