import productModel from "../models/productModel.js"
import { v2 as cloudinary } from "cloudinary"


// function for add product
const addProduct = async (req, res) => {
    try {
      const {name, price, description, category, subCategory, sizes, bestSeller} = req.body
      const image1 = req.files.image1 && req.files.image1[0]
      const image2 = req.files.image2 && req.files.image2[0]
      const image3 = req.files.image3 && req.files.image3[0]
      const image4 = req.files.image4 && req.files.image4[0]

      const images = [image1, image2, image3, image4].filter(item => item !== undefined)

      let imagesUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
          return result.secure_url
        }))

      const productData = {
        name, 
        description, 
        category, 
        subCategory, 
        price: Number(price), 
        sizes: JSON.parse(sizes), 
        bestSeller: bestSeller === "true" ? true : false, 
        images: imagesUrl,
        date: Date.now()
      }

      const product = new productModel(productData)
      await product.save()

      res.status(200).json({success: true, message: "Product added successfully"})

    }
    catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error.message})
    }
}

// function for get all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.status(200).json({success: true, message: "Products fetched successfully", products})
  }
  catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: error.message})
  }
}

// Remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.status(200).json({success: true, message: "Product deleted successfully"})
  }
  catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: error.message})
  }
}

// Get product Details
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)
    res.status(200).json({success: true, message: "Product fetched successfully", product})
  }
  catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: error.message})
  }
}

export {addProduct, listProducts, removeProduct, singleProduct}