import mongoose from "mongoose";
import "dotenv/config";
import { products } from "./data/products.js";
import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";
import connectDB from "./config/mongodb.js"; // Import DB connection

// Function to seed data
const seedData = async () => {
  try {
    await connectDB(); // Ensure DB connection

    // Clear existing data
    await userModel.deleteMany();
    await productModel.deleteMany();

    // Create a default admin user
    const createdUser = await userModel.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID,
    }));

    // Insert products into the database
    await productModel.insertMany(sampleProducts);
    console.log("✅ Product Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error Seeding Data: ", error);
    process.exit(1);
  }
};

seedData();
