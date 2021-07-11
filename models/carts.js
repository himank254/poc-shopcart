const mongoose = require('mongoose')
const validator = require('validator')

const cartSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username already exist"],
    },

   cart: []
})


// Creating the collection using schema

const Cart = new mongoose.model("Cart", cartSchema)

module.exports = Cart