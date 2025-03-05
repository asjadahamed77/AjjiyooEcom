import express from 'express'
import productModel from '../models/productModel.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const productAdminRouter = express.Router()

// Get all products (Admin only)
productAdminRouter.get('/', protect, admin, async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).send("Server Error.")
    }
})

export default productAdminRouter;