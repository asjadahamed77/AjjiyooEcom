import express from "express";
import userModel from "../models/userModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const adminRouter = express.Router();

// Get all users (Admin only)
adminRouter.get("/", protect, admin, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Add a new user (Admin only)
adminRouter.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    user = new userModel({
      name,
      email,
      password,
      role: role || "customer",
    });

    await user.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Update user info (admin only)
adminRouter.put("/:id", protect, admin, async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();
      res.json({ message: "User updated successfully.", user: updatedUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Delete a user (admin only)
adminRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await user.deleteOne()
    res.json({ message: "User removed." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

export default adminRouter;
