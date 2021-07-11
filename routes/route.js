const express = require('express')
const User = require('../models/users')
const Product = require('../models/products')
const Cart = require('../models/carts')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../middleware/auth_middleware')
const cart_auth = require('../middleware/cartauth_middleware')

const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .required(),

    password: Joi.string()
        .required()

})


router.post('/register', (req, res) => {
    const user = new User(req.body)
    const cart = new Cart({
        username: req.body.username 
    })
    user.save().then(()=> {
        res.send("Registered Successfully")
        cart.save().then(()=> {
            console.log("Cart Added Successfully")
        }).catch((e) => {
            console.log(e)
        })
    }).catch((e) => {
        res.status(400).send(e)
    })  
})

router.post('/login', async (req, res) => {
    try{

        const val_res = schema.validate(req.body)
        if(val_res.error){
            res.send("Both Fields are required")
        }
        else{
            const userList = await User.findOne(req.body)
            if (userList == null){
                res.send("unsuccessfull")
            }
            else{
                const token = jwt.sign({id: userList._id}, 'himankkasecrethaiyeh')
                res.send(token)
            }
        }        
    }catch(e){
        console.log(e)
    }
})


router.post('/add-product', auth , (req, res) => {
    
    const product = new Product(req.body)
    product.save().then(()=> {
        res.send("Product Added Successfully")
    }).catch((e) => {
        res.status(400).send(e)
    })  
})

router.delete('/delete-product/:id', auth, async (req, res) => {
    try{
        const delete_product = await Product.findByIdAndDelete(req.params.id)
            res.status(200).send(`Product ${delete_product.product_name} has been removed`)
        
    }catch(e){
        res.status(400).send("No product with the mentioned ID found")
    }
    
})

router.get('/show-product', async (req, res) => {
    const product_list = await Product.find()
    res.send(product_list)
})


router.patch('/update-product/:id',auth, async(req, res) => {
    try{
        const _id = req.params.id
        const updateProduct  = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.send(updateProduct)
    }
    catch(e){
        res.status(400).send(e)
    }
})


router.patch('/addto-cart/:id', cart_auth, async(req, res) => {
    try{
        const product_toadd = await Product.findOne({product_name : req.body.product_name})
        if(product_toadd == null){
            res.status(400).send("This Product Does not Exist")
        }
        else{
            const _id = req.params.id
            const add_in_cart = await Cart.findByIdAndUpdate(_id,
            { "$push" : {"cart" : req.body.product_name}},
            {new: true}
            )
            res.send(add_in_cart)
        }
        
    }
    catch(e){
        res.status(400).send("No cart with mentioned ID found")
    }
})


router.patch('/deletefrom-cart/:id', cart_auth, async(req, res) => {
    try{
        const product_todelete = await Product.findOne({product_name : req.body.product_name})
        if(product_todelete == null){
            res.status(400).send("This Product Does not Exist")
        }
        else{
            const _id = req.params.id
            const delete_from_cart = await Cart.findByIdAndUpdate(_id,
            { "$pull" : {"cart" : req.body.product_name}},
            {new: true}
            )
            res.send(delete_from_cart)
        }
        
    }
    catch(e){
        res.status(400).send("No cart with mentioned ID found")
    }
})




module.exports = router