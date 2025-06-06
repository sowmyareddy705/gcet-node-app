import express from 'express';
import orderModel from '../models/orderModel.js';

const orderRouter = express.Router();

// Create a new order
orderRouter.post("/new", async (req, res) => {
  try {
    const { email, orderValue, items } = req.body;
    const result = await orderModel.create({ email, orderValue, items });
    res.status(201).json(result);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Failed to place order." });
  }
});

// Get orders by email
orderRouter.get("/:email", async (req, res) => {
  try {
    const orders = await orderModel.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

export default orderRouter;
