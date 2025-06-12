const mongoose = require("mongoose")
const mongoosePaginate = require ("mongoose-paginate-v2")

//* Defino el Schema

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }, 
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    available: { type: Boolean, default: true },
    category: { type: String, required: true },  
    thumbnail: { type: String }, 
}, { timestamps: true })



productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Product", productSchema)