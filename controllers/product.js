const Product = require('../models/products')

const addProduct = (req, res) => {
    
    const product = new Product(req.body)
    product.save().then(()=> {
        res.status(201).send("Product Added Successfully")
    }).catch((e) => {
        res.status(400).send(e)
    })  
}

const showProduct = async (req, res) => {
    const product_list = await Product.find()
    res.send(product_list)
}

const deleteProduct = async (req, res) => {
    try{
        const delete_product = await Product.findByIdAndDelete(req.params.id)
            res.status(200).send(`Product ${delete_product.product_name} has been removed`)
        
    }catch(e){
        res.status(400).send("No product with the mentioned ID found")
    }
    
}

const updateProduct = async(req, res) => {
    try{
        const _id = req.params.id
        const update_Product  = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        })
        res.status(201).send(update_Product)
    }
    catch(e){
        res.status(400).send(e)
    }
}

module.exports = {
    addProduct, showProduct, deleteProduct, updateProduct
}