const mongoose = require('mongoose')
const validator = require('validator')

const productlistSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: [true, "Product already exist"],
    },

    quantity: {
        type: Number,
        required: true,
    }
})


// Creating the collection using schema

const Product = new mongoose.model("Product", productlistSchema)

module.exports = Product