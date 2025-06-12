const Cart = require("../models/cart.model")

class CartManager {

    async createCart() {
        const newCart = new Cart({ products: [] })
        await newCart.save()
        return newCart
    }

    async getCartById(cid) {
        try {
            const cart = await Cart.findById(cid).populate('products.product').lean();
            return cart;
        } catch (error) {
            throw new Error('Error al obtener carrito');
        }
    }

    async addProductToCart(cid, pid) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid.toString())
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1
        } else {
            cart.products.push({ product: pid, quantity: 1 })
        }
        await cart.save()
        return cart
    }

    async removeProductFromCart(cid, pid) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        cart.products = cart.products.filter(p => p.product.toString() !== pid.toString())
        await cart.save()
        return cart
    }

    async clearCartProducts(cid) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        cart.products = []
        await cart.save()
        return cart
    }   

    async updateCartProducts(cid, productsArray) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        cart.products = productsArray.map(p => ({
            product: p.product,
            quantity: p.quantity
        }))
        await cart.save()
        return cart
    }

    async updateProductQuantity(cid, pid, quantity) {
        const cart = await Cart.findById(cid)
        if (!cart) throw new Error('Carrito no encontrado')

        const productInCart = cart.products.find(p => p.product.toString() === pid.toString())
        if (!productInCart) throw new Error('Producto no encontrado en el carrito')

        productInCart.quantity = quantity
        await cart.save()
        return cart
    }
}

module.exports = CartManager
