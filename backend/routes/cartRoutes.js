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
    // Fetch the product
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Determine if the user is logged in or a guest
    let cart = await getCart(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // If the product already exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add a new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "default-image-url.jpg", // Fallback for missing images
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

      await cart.save();
      return res.status(201).json(cart);
    } else {
      // Create a new cart for the guest or user
      const newCart = await cartModel.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url || "default-image-url.jpg", // Fallback for missing images
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Server Error." });
  }
});

// update product quantity in the cart for a guest or logged in user
cartRouter.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      // Update the quantity
      cart.products[productIndex].quantity = quantity;

      // Remove product if quantity is 0
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json({ success: true, cart });
    } else {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ success: false, message: "Server Error." });
  }
});
// Remove a product from the cart
cartRouter.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      // Remove the product
      cart.products.splice(productIndex, 1);

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json({ success: true, cart });
    } else {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Server Error." });
  }
});

// Get the cart for a user or guest
cartRouter.get("/get", async (req, res) => {
  const { guestId, userId } = req.query;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error.");
  }
});

cartRouter.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  try {
    let guestCart = await cartModel.findOne({ guestId });
    let userCart = await cartModel.findOne({ user: req.user._id });

    if (!guestCart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    if (!userCart) {
      // If user has no existing cart, assign the guest cart to the user
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.status(200).json(guestCart);
    } else {
      // Merge guest cart into user cart
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      // Update total price
      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();

      // Remove the guest cart after merging
      try {
        await cartModel.findOneAndDelete({ guestId });
      } catch (error) {
        console.error("Error deleting guest cart:", error);
        return res.status(500).json({ message: "Error deleting guest cart." });
      }

      return res.status(200).json(userCart);
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server Error." });
  }
});

export default cartRouter;
