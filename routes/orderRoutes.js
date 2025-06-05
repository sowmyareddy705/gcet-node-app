import express from 'express'
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router()

orderRouter.post("/new", async (req, res) => {
  const {email, orderValue} = req.body;
  const result= orderModel.insertMany({email, orderValue});
  res.json(result);
});

export default orderRouter