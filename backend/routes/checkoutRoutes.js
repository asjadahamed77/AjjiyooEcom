import express from "express";

import checkoutModel from "../models/checkout.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import { protect } from "../middleware/authMiddleware.js";

const checkoutRouter = express.Router();

// Create a new checkout session
checkoutRouter.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    // Create a new checkout session
    const newCheckout = await checkoutModel.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    res.status(201).json(newCheckout);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Update checkout to mark as paid after successful payment
checkoutRouter.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    const checkout = await checkoutModel.findById(req.params.id);
    if (!checkout) {
      return res.status(400).json({ message: "Checkout is not found." });
    }
    if (paymentStatus === "Paid") {
      checkout.isPaid = true;
      checkout.paidAt = Date.now();
      checkout.paymentDetails = paymentDetails;
      checkout.paymentStatus = paymentStatus;
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Payment failed." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Finalize checkout and convert to an order after payment confirmation
checkoutRouter.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await checkoutModel.findById(req.params.id);
    if (!checkout) {
      return res.status(400).json({ message: "Checkout not found." });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await orderModel.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        isDelivered: false,
        paidAt: checkout.paidAt,
        paymentStatus: "Paid",
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await cartModel.findOneAndDelete({ user: checkout.user });
      await checkout.save();

      res.status(201).json(finalOrder);
    } else {
      return res.status(400).json({
        message: checkout.isFinalized
          ? "Checkout already finalized."
          : "Payment is not completed.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

export default checkoutRouter