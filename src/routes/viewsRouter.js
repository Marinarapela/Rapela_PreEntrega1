const { Router } = require('express')
const productService = require('../services/productService')
const Cart = require ('../services/cartService')
const router = Router()
const mongoose = require('mongoose');


router.get('/home', async (req, res) => {
    
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
        const result = await productService.getAllProducts({ ...req.query, baseUrl })
        res.render('pages/home', {
        products: result.payload,
        cartId: req.session.cartId
        })
    } catch (error) {
        res.status(500).send('Error al obtener productos')
    } 
})

router.get('/realTimeProducts', (req, res) => {
    res.render('pages/realTimeProducts')
})

router.get('/products', async (req, res) => {
    try {
        // Crea carrito en sesión si no existe
        if (!req.session.cartId) {
            const newCart = await Cart.createCart()
            req.session.cartId = newCart._id.toString();
        }

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        const result = await productService.getAllProducts({ ...req.query, baseUrl });

        // Pasa cartId junto con los demás datos a la vista
        res.render('pages/products', {
        ...result,
        cartId: req.session.cartId,
        query: req.query
        });
    } catch (err) {
        res.status(500).send('Error al cargar productos');
    }
});


router.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send('ID de producto inválido');
    }
    try {
        const product = await productService.getProductById(productId)    
        if (!product) return res.status(404).send('Producto no encontrado')
        res.render('pages/productDetail', { 
            product,
            cartId: req.session.cartId 
        })
    } catch (error) {
        res.status(500).send('Error al obtener el producto')
}
})

router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product')
        if (!cart) return res.status(404).send('Carrito no encontrado')
        res.render('pages/cart', { products: cart.products })
    } catch (error) {
        res.status(500).send('Error al cargar el carrito')
    }
})

module.exports = router
