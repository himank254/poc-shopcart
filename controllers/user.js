const User = require('../models/users')
const Cart = require('../models/carts')
const jwt = require('jsonwebtoken')
const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .required(),

    password: Joi.string()
        .required()

})


const register = (req, res) => {
    const user = new User(req.body)
    const cart = new Cart({
        username: req.body.username 
    })
    user.save().then(()=> {
        res.status(201).send("Registered Successfully")
        cart.save().then(()=> {
            console.log("Cart Added Successfully")
        }).catch((e) => {
            console.log(e)
        })
    }).catch((e) => {
        res.status(406).send(e)
    })  
}

const login = async (req, res) => {
    try{

        const val_res = schema.validate(req.body)
        if(val_res.error){
            res.status(406).send("Both Fields are required")
        }
        else{
            const userList = await User.findOne(req.body)
            if (userList == null){
                res.status(401).send("unsuccessfull")
            }
            else{
                const token = jwt.sign({id: userList._id}, 'himankkasecrethaiyeh')
                res.send(token)
            }
        }        
    }catch(e){
        res.status(400).send(e)
    }
}


module.exports = {
    login,
    register
}