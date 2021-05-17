const mongoose = require('mongoose')
const validator = require('validator');

const User =  mongoose.model('User', {
    name: {
        type:String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type:Number,
        default:0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive number!')
            }
        }
    },
    password: {
        type: String,
        required:true,
        minlength:6,
        trim:true,
        validate(value) {
            if (validator.contains('password', value.toLowerCase())) {
                throw new Error('Password can not contain password word')
            }
        }
    }
})

module.exports = User