import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    orderValue: { type: Number, required: true },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

export default mongoose.model("Order", orderSchema);
