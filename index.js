import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
// import Razorpay from "razorpay";
// import crypto from "crypto";

import productRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import Cart from "./models/Cart.js";

dotenv.config();
const app = express();
// const razorpay = new Razorpay({
// key_id,
// key_secret,
// });


mongoose.connect(`${process.env.MONGO_URL}`);
const db = mongoose.connection;

db.once('open', () => {console.log('Database Connected')});
db.on('error', (error) => console.log({message: error.message}));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// app.post('/checkout', async (req,res)=> {

//   try {


//     const data = req.body;
// const order = await razorpay.orders.create(
//   {
//     amount: data.total,
//     currency: 'INR'
//   });

  //   res.status(200).json({
  //     ...order
  //   })
      
//   } catch (error) {
//     res.status(500).json({message: error.message})
//   }
// });

// app.post("/paymentVerification", (req,res) => {
  /*
     const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
    let inputStr = `${razorpay_order_id}|razorpay_payment_id`;
    const expectedSignature = crypto.createHmac('sha256', `${process.env.RAZORPAY_KEY_ID}`)
                                   .update(inputStr.toString())
                                   .digest('hex')
  
                if(razorpay_signature ! == expectedSignature) {
                 res.redirect(`http://localhost:5173/checkout/failure?ref=${razorpay_payment_id}`)
                }

                // save data to database with req.body as fields => make a Payment Schema
                res.redirect(`http://localhost:5173/checkout/success?ref=${razorpay_payment_id}`);
                return res.status(200).json({success: true})
  */
// })

app.use("/products", productRouter);
app.use("/cart", cartRouter);


app.listen(4000, () => { 
    console.log('server is listening on port 4000');
})