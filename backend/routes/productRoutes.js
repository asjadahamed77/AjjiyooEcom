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

// Edit Product
productRouter.put('/edit/:id',protect, admin, async(req,res)=>{
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
            sku
        } = req.body

        // Find the product by id
        const product = await productModel.findById(req.params.id)

        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand || product.brand
            product.sizes = sizes || product.sizes
            product.colors = colors || product.colors
            product.collections = collections || product.collections
            product.material = material || product.material
            product.gender = gender || product.gender
            product.images = images || product.images
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
            product.tags = tags || product.tags
            product.dimensions = dimensions || product.dimensions
            product.weight = weight || product.weight
            product.sku = sku || product.sku

            // Save the updated product
            const updatedProduct = await product.save()
            res.json({success:true, message:"Product Updated Successfully.", updatedProduct})

        }
        else{
            res.status(404).json({success:false, message:"Product not found."})
        } 

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }

})
// Delete Product by ID
productRouter.delete('/delete/:id', protect, admin, async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);

        if (product) { // Ensure product exists before deleting
            res.json({ success: true, message: "Product Deleted Successfully." });
        } else {
            res.status(404).json({ success: false, message: "Product not found." });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
});




export default productRouter
