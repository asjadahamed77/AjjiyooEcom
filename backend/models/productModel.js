import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
      maxlength: [1000, "Product description cannot exceed 1000 characters."],
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Product price cannot be negative."],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative."],
    },
    countInStock: {
      type: Number,
      required: [true, "Product stock count is required."],
      min: [0, "Stock count cannot be negative."],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, "Product SKU is required."],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
    },
    brand: {
      type: String,
      trim: true,
    },
    sizes: {
      type: [String],
      required: [true, "Product sizes are required."],
    },
    colors: {
      type: [String],
      required: [true, "Product colors are required."],
    },
    collections: {
      type: String,
      required: [true, "Product collection is required."],
    },
    material: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: [true, "Product gender is required."],
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required."],
        },
        altText: {
          type: String,
          trim: true,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be negative."],
      max: [5, "Rating cannot exceed 5."],
      default: 0,
    },
    numReviews: {
      type: Number,
      min: [0, "Number of reviews cannot be negative."],
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User ID is required."],
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    dimensions: {
      length: {
        type: Number,
        min: [0, "Length cannot be negative."],
      },
      height: {
        type: Number,
        min: [0, "Height cannot be negative."],
      },
      width: {
        type: Number,
        min: [0, "Width cannot be negative."],
      },
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative."],
    },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;