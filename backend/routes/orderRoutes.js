import express from 'express'
import orderModel from "../models/orderModel.js";
import { protect } from '../middleware/authMiddleware.js';
const orderRouter = express.Router();

// Get logged in user orders
orderRouter.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
});

// Get order details by ID
orderRouter.get('/:id', protect, async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
});


export default orderRouter;