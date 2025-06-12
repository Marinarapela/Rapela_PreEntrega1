require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('../models/product.model') 


const products = [
    {
        title: "Ficus Lyrata",
        description: "Planta de interior con hojas grandes y brillantes, ideal para decorar espacios.",
        price: 2500,
        stock: 15,
        available: true,
        category: "Plantas de interior",
        thumbnail: "https://example.com/images/ficus_lyrata.jpg"
    },
    {
        title: "Helecho Boston",
        description: "Planta colgante con frondas verdes y frondosas, perfecta para ambientes húmedos.",
        price: 1800,
        stock: 30,
        available: true,
        category: "Plantas de interior",
        thumbnail: "https://example.com/images/helecho_boston.jpg"
    },
    {
        title: "Suculenta Echeveria",
        description: "Planta suculenta de fácil cuidado, ideal para macetas pequeñas y decoración de escritorio.",
        price: 800,
        stock: 50,
        available: true,
        category: "Suculentas",
        thumbnail: "https://example.com/images/echeveria.jpg"
    },
    {
        title: "Cactus Saguaro",
        description: "Cactus de gran tamaño, resistente a la sequía, para jardines exteriores.",
        price: 3500,
        stock: 10,
        available: true,
        category: "Cactus",
        thumbnail: "https://example.com/images/cactus_saguaro.jpg"
    },
    {
        title: "Palma Areca",
        description: "Palma elegante para interiores y patios, aporta frescura y estilo.",
        price: 2800,
        stock: 20,
        available: true,
        category: "Palmas",
        thumbnail: "https://example.com/images/palma_areca.jpg"
    },
    {
        title: "Lavanda",
        description: "Planta aromática con flores violetas, ideal para jardines y para uso en infusiones.",
        price: 1500,
        stock: 40,
        available: true,
        category: "Plantas aromáticas",
        thumbnail: "https://example.com/images/lavanda.jpg"
    },
    {
        title: "Orquídea Phalaenopsis",
        description: "Orquídea delicada con flores blancas, perfecta para interiores y decoración elegante.",
        price: 3200,
        stock: 12,
        available: true,
        category: "Orquídeas",
        thumbnail: "https://example.com/images/orquidea_phalaenopsis.jpg"
    },
    {
        title: "Bonsái Ficus",
        description: "Árbol miniatura para decoración interior, requiere cuidados específicos.",
        price: 4500,
        stock: 8,
        available: true,
        category: "Bonsáis",
        thumbnail: "https://example.com/images/bonsai_ficus.jpg"
    },
    {
        title: "Romero",
        description: "Hierba aromática ideal para cocinar y jardines, fácil de cuidar.",
        price: 1200,
        stock: 60,
        available: true,
        category: "Plantas aromáticas",
        thumbnail: "https://example.com/images/romero.jpg"
    },
    {
        title: "Hiedra",
        description: "Planta trepadora de hojas verdes, excelente para cubrir muros y pérgolas.",
        price: 2000,
        stock: 25,
        available: true,
        category: "Plantas trepadoras",
        thumbnail: "https://example.com/images/hiedra.jpg"
    },
    {
        title: "Aloe Vera",
        description: "Planta suculenta con propiedades medicinales, fácil de mantener.",
        price: 900,
        stock: 45,
        available: true,
        category: "Suculentas",
        thumbnail: "https://example.com/images/aloe_vera.jpg"
    },
    {
        title: "Cactus Navidad",
        description: "Cactus con flores rojas que florecen en invierno, planta decorativa y resistente.",
        price: 2200,
        stock: 18,
        available: true,
        category: "Cactus",
        thumbnail: "https://example.com/images/cactus_navidad.jpg"
    },
    {
        title: "Petunia",
        description: "Planta con flores coloridas, ideal para macetas y jardines de verano.",
        price: 1300,
        stock: 50,
        available: true,
        category: "Plantas florales",
        thumbnail: "https://example.com/images/petunia.jpg"
    },
    {
        title: "Cítricos enano",
        description: "Árbol pequeño de limón o naranja, para maceta o jardín pequeño.",
        price: 3600,
        stock: 14,
        available: true,
        category: "Árboles frutales",
        thumbnail: "https://example.com/images/citricos_enanos.jpg"
    },
    {
        title: "Geranios",
        description: "Planta con flores vibrantes y hojas aromáticas, común en balcones y jardines.",
        price: 1100,
        stock: 55,
        available: true,
        category: "Plantas florales",
        thumbnail: "https://example.com/images/geranios.jpg"
    },
    {
        title: "Palma Kentia",
        description: "Palma elegante para interiores con hojas largas y arqueadas.",
        price: 3000,
        stock: 17,
        available: true,
        category: "Palmas",
        thumbnail: "https://example.com/images/palma_kentia.jpg"
    },
    {
        title: "Bromelia",
        description: "Planta tropical con flores llamativas, ideal para interiores y patios.",
        price: 2700,
        stock: 22,
        available: true,
        category: "Plantas tropicales",
        thumbnail: "https://example.com/images/bromelia.jpg"
    },
    {
        title: "Helecho Nido de Ave",
        description: "Helecho con hojas grandes y forma redondeada, decorativo para interiores.",
        price: 2100,
        stock: 20,
        available: true,
        category: "Plantas de interior",
        thumbnail: "https://example.com/images/helecho_nido_ave.jpg"
    },
    {
        title: "Tomillo",
        description: "Hierba aromática para cocinar y medicinal, fácil de cultivar.",
        price: 1400,
        stock: 35,
        available: true,
        category: "Plantas aromáticas",
        thumbnail: "https://example.com/images/tomillo.jpg"
    },
    {
        title: "Petiribi",
        description: "Árbol nativo ideal para jardines y sombra, resistente y de rápido crecimiento.",
        price: 4000,
        stock: 10,
        available: true,
        category: "Árboles nativos",
        thumbnail: "https://example.com/images/petiribi.jpg"
    }
]

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

    console.log('Conectado a MongoDB')


    // Insertar los productos
    const result = await Product.insertMany(products)
    console.log(`${result.length} productos insertados`)

    mongoose.disconnect()
    } catch (error) {
        console.error('Error cargando productos:', error)
    }
}

seed()