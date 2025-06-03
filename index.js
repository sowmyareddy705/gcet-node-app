import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.listen(8080, () => {
    mongoose.connect("mongodb://localhost:27017/gcet");
  console.log("Server Started on port 8080");
});

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  pass: { type: String },
})

const user = mongoose.model("User", userSchema);

const productSchema = mongoose.Schema({
  name: { type: String },
  price: { type: Number},
});
const product =mongoose.model("Product", productSchema);

app.use(cors())
app.use(express.json())
app.get("/", async (req, res) => {
  return res.send("Good Morning");
});


app.post("/register", async(req, res)=>{
    const {name, email, pass } = req.body;
    const result = await user.insertOne({name, email, pass});
    return res.json(result);
})

app.post("/login" , async (req, res) => {
  const { email, pass } = req.body;
  const result = await user.findOne({ email, pass });
  if (!result) return res.json({message: "IN=nvalid user or password"})
    return res.json(result);
});

app.get("/greet",(req,res)=>{res.send("Greetings")})

app.get("/name",(req,res)=>{res.send("sowmya reddy")})

app.get("/weather",(req,res)=>{res.send("31degree")})



// import express from "express";
// import cors from "cors";
// const app = express();
// app.listen(8080, () => {
//   console.log("Server Started on port 8080");
// });

// app.use(express.json());
// app.use(cors());
// const users = [];

// app.get("/", (req, res) => {
//   return res.json(users);
// });

// app.post("/register", (req, res) => {
//   const { name, email, pass } = req.body;
//   users.push({ name, email, pass });
//   return res.json(users);
// });

// app.post("/login", (req, res) => {
//   const { email, pass } = req.body;
//   const found = users.find(
//     (value) => value.email === email && value.pass === pass
//   );
//   if (!found) {
//     res.json({message:"User not found"})
//   }
//   res.json({...found,token:"123"});
// });