import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
    size: String,
    color: String,
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      paymentMethod: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      isPaid: {
        type: Boolean,
        required: true,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        default: false
      },
      deliveredAt: {
        type: Date
      },
      paymentStatus:{
        type: String,
        enum: "Pending"
      },
      status: {
        type: String,
        enum: ["Processing","Shipped","Delivered","Cancelled"],
        default: "Processing"
      },

},
{ timeseries: true }
)

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
