const fs = require('fs').promises
const path = require('path')

const cartsFilePath = path.join(__dirname, '../data/carts.json')

class CartManager {
    async _readFile() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            return []
        }
    }

    async _writeFile(data) {
    await fs.writeFile(cartsFilePath, JSON.stringify(data, null, 2))
    }

    async createCart() {
        const carts = await this._readFile()
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1

        const newCart = {
            id: newId,
            products: []
        }

        carts.push(newCart)
        await this._writeFile(carts)
        return newCart
    }

    async getCartById(cid) {
        const carts = await this._readFile()
        return carts.find(cart => cart.id === cid)
    }

    async addProductToCart(cid, pid) {
        const carts = await this._readFile()
        const cartIndex = carts.findIndex(cart => cart.id === cid)
        if (cartIndex === -1) return null

    const cart = carts[cartIndex]
    const productId = Number (pid)
    const productInCart = cart.products.find(p => p.product === pid)

    if (productInCart) {
        productInCart.quantity += 1
    } else {
        cart.products.push({ product: productId, quantity: 1 })
    }

    carts[cartIndex] = cart
    await this._writeFile(carts)
    return cart
    }
}

module.exports = CartManager
