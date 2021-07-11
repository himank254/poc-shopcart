const Cart = require('../models/carts')

const addToCart = async(req, res) => {
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
}

const deleteFromCart = async(req, res) => {
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
}

module.exports = {
    addToCart, deleteFromCart
}