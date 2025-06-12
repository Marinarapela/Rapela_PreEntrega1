const productService = require('../services/productService')

exports.getAllProducts = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
        const result = await productService.getAllProducts({...req.query, baseUrl})
        res.status(200).json(result)
    } catch (err) {
        console.log('✅ Resultado:', result);
        res.status(500).send("Error al obtener los productos")
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productService.getProductById(id)
        if (product){ res.status(200).json(product)
        } else {
        res.status(404).send("Producto no encontrado")
        }
    } catch (err) {
        res.status(500).send("Error al obtener el producto")
    }
}

exports.createProduct = async (req, res) => {
    const { title, description, price } = req.body

    if (!title || !description || price == null) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: title, description, price' })
    }
    try {
        const newProduct = await productService.createProduct(req.body)
        res.status(201).json(newProduct)
    } catch (err) {
        res.status(500).send("Error al crear el producto")
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const updated = await productService.updateProduct(id, req.body)
        res.status(200).json(updated)
    } catch (err) {
        res.status(500).send("Error al actualizar el producto")
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const result = await productService.deleteProduct(id)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).send("Error al eliminar el producto")
    }
}

