const express = require('express')
const CartManager = require('../managers/cartManager')
const ProductManager = require('../managers/productManager')

const router = express.Router()
const cartManager = new CartManager()
const productManager = new ProductManager()

// Crear un carrito
router.post('/', async (req, res) => {
    const cart = await cartManager.createCart()
    res.status(201).json(cart)
})

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid)
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })
    res.json(cart)
})

// Agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    const productExists = await productManager.getProductById(pid)
    if (!productExists) return res.status(404).json({ message: 'Producto no encontrado' })

    const cart = await cartManager.addProductToCart(cid, pid)
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })

    res.json({
    message: 'Producto agregado al carrito',
    cart
    })
})

module.exports = router
