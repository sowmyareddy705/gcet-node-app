import express from 'express'
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 10);
  const result = await userModel.insertOne({ name: name, email: email, password: hashpassword });
  return res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await userModel.findOne({ email, password });
  if (!result) return res.json({ message: "Invalid user or password" });
  return res.json(result);
});

userRouter.get("/:id", async(req, res)=>{
    const email= req.params.id;
    const result= await userModel.findOne({email});
    return res.json(result);
});

userRouter.get("/:id/name", async(req, res)=>{
    const email= req.params.id;
    const result= await userModel.findOne({email},{_id:0, name:1});
    return res.json(result);
});

export default userRouter;