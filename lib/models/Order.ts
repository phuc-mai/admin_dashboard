import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      size: String,
      quantity: Number,
    },
  ],
  shippingAddress: {
    streetNumber: String,
    streetName: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
