import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    collections: {
        type: String,
        required: true
    },
    subCollections: {
        type: String,
        required: false
    },
    licence: {
        type: String,
        required: true
    },
    bestSeller: {
        type: Boolean,
    },
    date: {
        type: Number,
        default: true
    }
})

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema)

export default productModel

