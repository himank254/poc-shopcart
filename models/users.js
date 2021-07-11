const mongoose = require('mongoose')
const validator = require('validator')

const userlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: [true, "Username already exist"],
    },

    password: {
        type: String,
        required: true,
        minlenght: 6,
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})


// Creating the collection using schema

const User = new mongoose.model("User", userlistSchema)

module.exports = User