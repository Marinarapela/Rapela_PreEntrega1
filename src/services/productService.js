const ProductManager = require('../managers/productManager')
const productManager = new ProductManager()

exports.getAllProducts = (queryOptions) => productManager.getAllProducts(queryOptions)

exports.getProductById = (id) => productManager.getProductById(id)

exports.createProduct = (product) => productManager.createProduct(product)

exports.updateProduct = (id, updatedProduct) => productManager.updateProduct(id, updatedProduct)

exports.deleteProduct = (id) => productManager.deleteProduct(id)
