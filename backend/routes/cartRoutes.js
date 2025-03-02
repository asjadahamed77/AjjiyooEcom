import express, { Router } from "express";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import { protect } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
  if (userId) {
    return await cartModel.findOne({ user: userId });
  }
  if (guestId) {
    return await cartModel.findOne({ guestId });
  }
  return null;
};

// Add a product to the cart for a guest or loggen in user
cartRouter.post("/add", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found." });
    }
    // determine if the user is logged in or guest

    let cart = await getCart(userId, guestId);

    // If the cart is exists update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // If the product is already exists update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add a new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.image[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save()
      return res.status(201).json(cart)

    }else{
        // create a new cart for the guest or user
        const newCart = await cartModel.create({
            userId: userId ? userId : undefined,
            guestId: guestId ? guestId : "guest_" + new Date().getTime() ,
            products : [
                {
                    productId,
                    name: product.name,
                    image: product.image[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                }
            ],
            totalPrice: product.price * quantity,

        })
        return res.status(201).json(newCart)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

export default cartRouter;
