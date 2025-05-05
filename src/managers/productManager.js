const fs = require('fs').promises
const path = require('path')


class ProductManager {
    constructor(pathToFile) {
        this.path = pathToFile
    }

    
    // Leer productos desde el archivo
    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.error("Error al leer los productos:", error)
            return []
        }
    }

    // Escribir productos en el archivo
    async writeProducts(products) {
        try {
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
        } catch (error) {
            console.error("Error al guardar los productos:", error)
            throw error
        }
    }

    // Agregar un nuevo producto
    async addProduct(product) {
        const products = await this.readProducts()
        
        // Generar el nuevo ID automáticamente
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1
        const newProduct = { ...product, id: newId }

        products.push(newProduct)
        await this.writeProducts(products)
        return newProduct
    }

    // Obtener todos los productos
    async getAllProducts() {
        return await this.readProducts()
    }

    // Obtener un producto por ID
    async getProductById(id) {
        const products = await this.readProducts()
        return products.find(product => product.id === id)
    }

    // Actualizar un producto por ID
    async updateProduct(id, updatedProduct) {
        const products = await this.readProducts()
        const productIndex = products.findIndex(product => product.id === id)
        
        if (productIndex === -1) {
            throw new Error("Producto no encontrado")
        }

        const updatedProductWithId = { ...updatedProduct, id }
        products[productIndex] = updatedProductWithId
        await this.writeProducts(products)
        return updatedProductWithId
    }

    // Eliminar un producto por ID
    async deleteProduct(id) {
        const products = await this.readProducts()
        const updatedProducts = products.filter(product => product.id !== id)
        
        if (products.length === updatedProducts.length) {
            throw new Error("Producto no encontrado")
        }

        await this.writeProducts(updatedProducts)
        return { message: 'Producto eliminado con éxito' }
    }
}

module.exports = ProductManager