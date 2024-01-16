import mongoose from "mongoose";

import Product from "./Product.js";

const CartSchema = new mongoose.Schema({
product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product need to be added to the cart..."]
},
quantity: {
    type: Number,
    default: 1
}
});



const Cart = new mongoose.model("Cart", CartSchema);

export default Cart;