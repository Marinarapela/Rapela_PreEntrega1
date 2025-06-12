    const socket = io()

    const list = document.getElementById('product-list')
    const addForm = document.getElementById('add-product-form')
    const deleteForm = document.getElementById('delete-product-form')

    socket.on('products', products => {
        list.innerHTML = ''
    products.forEach(p => {
        list.innerHTML += `<li>${p.title} - $${p.price}</li>`
    })
    })

    addForm.addEventListener('submit', e => {
        e.preventDefault()

    const data = Object.fromEntries(new FormData(addForm))
    const title = data.title.trim()
    const price = parseFloat(data.price)
    const stock = parseInt(data.stock)

  // Validaciones 
    if (!title) {
        alert('El título es obligatorio.')
        return
    }

    if (isNaN(price) || price <= 0) {
        alert('El precio debe ser un número mayor a 0.')
        return
    }

    if (isNaN(stock) || stock < 0) {
        alert('El stock debe ser un número válido.')
        return
    }

    const product = { title, price, stock }
    socket.emit('addProduct', product)
    addForm.reset()
    })

    deleteForm.addEventListener('submit', e => {
        e.preventDefault()
        const id = document.getElementById('delete-id').value.trim()

        if (!id) {
            alert('El ID debe ser un número válido.')
            return
        }

        socket.emit('deleteProduct', id)
        deleteForm.reset()
    })