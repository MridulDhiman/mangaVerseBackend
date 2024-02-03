import express from "express";
import mongoose from "mongoose";
import axios from "axios";

import Cart from "../models/Cart.js";
const router = express.Router();

import Product from "../models/Product.js";

// add item to cart
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const id = data.product;
    const existingProduct = await Product.findOne({ _id: id });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    if (existingProduct.addedToCart) {
      const c = await Cart.updateOne(
        {
          product: id,
        },
        {
          $inc: { quantity: data.quantity },
        }
      );

      return res.status(200).json(c);
    } else if (!existingProduct.addedToCart) {
      const newItemToCart = new Cart({
        ...data,
      });
      await newItemToCart.save();
      await Product.updateOne(
        {
          _id: id,
        },
        {
          addedToCart: true,
        }
      );

      res.status(201).json(newItemToCart);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// quantity
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;
  console.log(req.body);
  console.log(id, quantity);
  try {
    await Cart.updateOne(
      {
        _id: id,
      },
      {
        quantity,
      }
    );

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

// quantity of many
router.put("/", async (req, res) => {

  const data = req.body;

 

  if (data.length > 0) {
    // console.log(data);
    try {
      for (let item of data) {
        console.log(item);
        const id = item.id;
        let response = await axios.patch(
          `http://localhost:4000/cart/${id}`,
          {
            quantity: item.quantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const res = response.data;
        // console.log(res);
        if (!res.success) {
          throw new Error("error occurred");
        }
      }

      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
});

router.delete("/:id/p/:productId", async (req, res) => {
  const id = req.params.id;
  const productId = req.params.productId;
  try {
    await Cart.deleteOne({ _id: id });
    await Product.updateOne(
      { _id: productId },
      {
        addedToCart: false,
      }
    );

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Product.updateMany({}, {
      addedToCart: false
    });
    await Cart.deleteMany({});
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const cart = await Cart.find({}).populate("product");
    res.json(cart);
  } catch (error) {
    res.json({ success: false });
  }
});



export default router;
