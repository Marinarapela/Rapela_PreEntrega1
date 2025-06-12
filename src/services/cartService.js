const CartManager = require('../managers/cartManager')
const cartManager = new CartManager()

exports.createCart = () => cartManager.createCart()

exports.getCartById = (cid) => cartManager.getCartById(cid)

exports.addProductToCart = (cid, pid) => cartManager.addProductToCart(cid, pid);

exports.removeProductFromCart = (cid, pid) => {
    return cartManager.removeProductFromCart(cid,pid)
}

exports.clearCartProducts = (cid) => {
    return cartManager.clearCartProducts(cid)
}

exports.updateCartProducts = (cid, productsArray) => {
    return cartManager.updateCartProducts(cid, productsArray)
}

exports.updateProductQuantity = (cid, pid, quantity) => {
    return cartManager.updateProductQuantity(cid, pid, quantity)
}
