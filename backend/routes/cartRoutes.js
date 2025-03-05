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

      await cart.save();
      return res.status(201).json(cart);
    } else {
      // create a new cart for the guest or user
      const newCart = await cartModel.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.image[0].url,
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
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// update product quantity in the cart for a guest or logged in user
cartRouter.put("/update-quantity", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        // update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(201).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error.");
  }
});

// Remove a product from the cart
cartRouter.delete("/delete", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(401).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error.");
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
