import express from "express";
import productModel from "../models/productModel.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/add", protect, admin, async (req, res) => {
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
    } = req.body;

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
      user: req.user._id, // reference to the admin user who created the product
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// Edit Product
productRouter.put("/edit/:id", protect, admin, async (req, res) => {
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
    } = req.body;

    // Find the product by id
    const product = await productModel.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the updated product
      const updatedProduct = await product.save();
      res.json({
        success: true,
        message: "Product Updated Successfully.",
        updatedProduct,
      });
    } else {
      res.status(404).json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});
// Delete Product by ID
productRouter.delete("/delete/:id", protect, admin, async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (product) {
      // Ensure product exists before deleting
      res.json({ success: true, message: "Product Deleted Successfully." });
    } else {
      res.status(404).json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});

// GET ALL PRODUCTS WITH FILTERS
productRouter.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    let sort = {};

    // Filter Logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
      if(search){
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ]
      }
      let sort = {};
      if (sortBy) {
        switch(sortBy){
            case "priceAsc":
                sort = { price: 1 }
                break;
            case "priceDesc":
                sort = { price: -1 }
                break;
            case "popularity":
                sort = { rating: -1 }
                break;
            default:
                break;
        }
      }
    }
    let products = await productModel.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});



// Retrieve similar products based on the current's product gender and category
productRouter.get("/similar/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const product = await productModel.findById(id)
        if(!product){
            res.status(404).json({success:false, message:"Product not found."})
        }
        const similarProducts = await productModel.find({
            _id: {$ne: id},
            category: product.category,
            gender: product.gender
        }).limit(4)
        res.json({success:true, similarProducts})
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
})

// Retrieve the product with highest rating 
productRouter.get('/best-seller', async(req,res)=>{
    try {
        const bestSeller = await productModel.findOne().sort({rating:-1})
        if(bestSeller){
            res.json(bestSeller)
        }else{
            res.status(404).json({success:false, message:"Best Seller not found."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.");
    }
})

// New Arrivals - Retrieve latest 8 products - Creation Date
productRouter.get('/new-arrivals', async(req,res)=>{
  try {
    const newArrivals = await productModel.find().sort({ createdAt: -1 }).limit(8)
    res.json(newArrivals)
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
})

// GET a Single Product by ID (Move this below new-arrivals)
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error.");
  }
});



export default productRouter;
