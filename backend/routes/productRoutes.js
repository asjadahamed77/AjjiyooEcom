import express from "express";
import productModel from "../models/productModel.js";
import { admin, protect } from "../middleware/authMiddleware.js";


const productRouter = express.Router();

productRouter.post('/add',protect, admin, async(req,res)=>{
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,

        } = req.body

        const product = new productModel({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id  // reference to the admin user who created the product
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

    } catch (error) {
        console.log(error);
    res.status(500).send("Server Error.");
    }
})

export default productRouter
