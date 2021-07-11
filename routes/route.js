const express = require('express')

const userController = require('../controllers/user')
const productController = require('../controllers/product')
const cartController = require('../controllers/cart')
const router = express.Router()
const auth = require('../middleware/auth_middleware')
const cart_auth = require('../middleware/cartauth_middleware')

// User Collection functionalities
router.post('/register', userController.register)
router.post('/login', userController.login)


// Product Collection functionalities
router.post('/add-product', auth , productController.addProduct)
router.delete('/delete-product/:id', auth, productController.deleteProduct)
router.get('/show-product', productController.showProduct)
router.patch('/update-product/:id',auth, productController.updateProduct)


// Cart Collection functionalities
router.patch('/addto-cart/:id', cart_auth, cartController.addToCart)
router.delete('/deletefrom-cart/:id', cart_auth, cartController.deleteFromCart)


module.exports = router