const app = require("./src/app.js")

const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server)

const ProductManager = require('./src/managers/productManager')
const productManager = new ProductManager()

io.on('connection', async socket => {
    console.log('Cliente conectado')

    const result = await productManager.getAllProducts({})
    socket.emit('products', result.payload)

    socket.on('addProduct', async data => {
        await productManager.createProduct(data)
        const result = await productManager.getAllProducts({})
        io.emit('products', result.payload)
    })

    socket.on('deleteProduct', async id => {
        await productManager.deleteProduct(id)
        const result = await productManager.getAllProducts({})
        io.emit('products', result.payload)
    })
})

const PORT = 8080

server.listen (PORT, () => {
    console.log (`Server listening on port http://localhost:${PORT}`)
})