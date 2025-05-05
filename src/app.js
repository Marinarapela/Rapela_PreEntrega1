const express = require ("express")
const app = express ()
const ProductManager = require('./managers/productManager')
const cartsRouter = require('./routes/carts')
var logger = require ("morgan")


const productManager = new ProductManager('./db/products.json')


app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))
app.use(logger("dev"))
app.use('/api/carts', cartsRouter)

// ROUTES /api/products y /api/carts

// GET

app.get("/api/products/", async (req,res ) => {
    try {
        const products = await productManager.readProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const products = await productManager.readProducts ()
        const product = products.find((product) => product.id === parseInt (id))
        if (product) {
            res.status (200).json(product)
        } else {
            res.status(400).send("Producto no encontrado")
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

// POST

app.post ("/api/products/", async (req,res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        console.error("Error al crear el producto:", error)
        res.status (500).send("Error interno del servidor")
    }
})

//PUT

app.put("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedProduct = await productManager.updateProduct(parseInt(id), req.body)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})


// DELETE
app.delete("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params       
        const result = await productManager.deleteProduct(parseInt(id))
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})


module.exports = app

app.use((req,res) => {
    return res.status (404).send(
        `<div>
            <h1>404 Not found</h1>
            <p>La ruta solicitada no existe</p>
        </div>`
    )
})