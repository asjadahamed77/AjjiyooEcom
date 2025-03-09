import express from 'express';
import orderModel from '../models/orderModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const adminOrderRouter = express.Router();

// Get all orders (Admin)
adminOrderRouter.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        console.log("Error in adminOrderRouter.get(): ", error);
        res.status(500).json({ message: "Server Error in adminOrderRouter.get()" });
    }
});

// Update order status (Admin)
adminOrderRouter.put('/:id', protect, admin, async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
  
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found." });
        }
    } catch (error) {
        console.log("Error in adminOrderRouter.put(): ", error);
        res.status(500).json({ message: "Server Error in adminOrderRouter.put()" });
    }
});

// Delete order (Admin)
adminOrderRouter.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order removed." });
        } else {
            res.status(404).json({ message: "Order not found." });
        }
    } catch (error) {
        console.log("Error in adminOrderRouter.delete(): ", error);
        res.status(500).json({ message: "Server Error in adminOrderRouter.delete()" });
    }
});

export default adminOrderRouter;