const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const validateCartProduct = require('../middlewares/validateCartProduct')

router.post('/', cartController.createCart)
router.get('/:cid', cartController.getCartById)
router.post('/:cid/products/:pid', validateCartProduct, cartController.addProductToCart)
router.delete('/:cid/products/:pid', cartController.deleteProductFromCart)
router.delete('/:cid', cartController.clearCartProducts)
router.put('/:cid', cartController.updateCartProducts)
router.put('/:cid/products/:pid', cartController.updateProductQuantity)

module.exports = router

