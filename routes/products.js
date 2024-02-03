import express from "express";
const router = express.Router();
import mongoose from "mongoose";

import Product from "../models/Product.js";

const items = [
    {
       name: "Gomu Gomu No Hoodie",
       price: 1299,
       hasDiscount: true,
       discountedPrice: 1999,
       addedToWishlist: false,
       slug: "gomu-gomu-no-hoodie",
       hoverImage : "products/onepiece_image.webp",
       initialImage : "products/one_piece_2.webp",
       isSoldOut: false,
       hasSensitiveContent: false,
       noOfReviews: 8,
       productType: "Tees",
       animeType: "One Piece",
       avgRating: 4.4,// show rating UI if less than 10 customer reviews
       allSizesAvailable: false,
       availableSizes: ["XS", "S", "M", "XL"],// agar 0 customer reviews 
       hasOffer: true,
       offerDueDate: new Date(),
       offerType: ["Limited Edition", "Neon Print", "Sleeveless"] 
    }, 
     {
      name : "Bankai Hoodie (Oversize Drop-Shoulder)",
      price: 1999,
      hasDiscount: true,
      slug: "bankai-hoodie",
      discountedPrice: 2299,
      addedToWishlist: false,
      hoverImage : "products/bankai2.webp",
      initialImage : "products/bankai1.webp",
      isSoldOut: false,
      hasSensitiveContent: false,
      noOfReviews: 3,
      avgRating: 5,// show rating UI if less than 10 customer reviews
      allSizesAvailable: true,
      availableSizes: ["XS", "S", "M", "L", "XL"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      productType: "Hoodies",
      animeType: "Bleach",
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"] 
     },
     {
      name : "Draken Pattern Tee (Oversize Drop-Shoulder)",
      price: 849,
      hasDiscount: true,
      slug: "draken-pattern-tee",
      discountedPrice: 1049,
      addedToWishlist: false,
      hoverImage : "products/draken2.webp",
      initialImage : "products/draken1.webp",
      isSoldOut: false,
      hasSensitiveContent: false,
      productType: "Tees",
      animeType:"Tokyo Revengers",
      noOfReviews: 26,
      avgRating: 4.2,// show rating UI if less than 10 customer reviews
      allSizesAvailable: true,
      availableSizes: ["XS", "S", "M", "L", "XL"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"] 
     },
     {
      name : "One Piece Vol. 08",
      price: 699,
      hasDiscount: false,
      addedToWishlist: false,
      slug: "one-piece-vol-8",
      hoverImage : "products/onepiecemanga2.webp",
      initialImage : "products/onepiecemanga1.webp",
      isSoldOut: false,
      hasSensitiveContent: false,
      noOfReviews: 0,
      productType:"Manga",
      animeType:  "One Piece",
      avgRating: 4,// show rating UI if less than 10 customer reviews
      allSizesAvailable: false,
      availableSizes: [ "M", "L", "XL"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"] 
     },
     {
      name : "Itadori Jujutsu Uniform",
      price: 1399,
      hasDiscount: true,
      discountedPrice: 1999,
      addedToWishlist: false,
      slug: "itadori-jujutsu-uniform",
      hoverImage : "products/itadori2.webp",
      initialImage : "products/itadori1.webp",
      isSoldOut: false,
      hasSensitiveContent: false,
      noOfReviews: 48,
      productType: "Uniform",
      animeType: "Jujutsu Kaisen",
      avgRating: 4.6,// show rating UI if less than 10 customer reviews
      allSizesAvailable: false,
      availableSizes: ["XS", "S", "XL"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"] 
     },
     {
      name : "Kamehameha Hoodie",
      price: 1299,
      hasDiscount: true,
      discountedPrice: 1999,
      addedToWishlist: false,
      slug: 'kamehameha-hoodie',
      hoverImage : "products/kamehameha2.webp",
      initialImage : "products/kamehameha1.webp",
      isSoldOut: false,
      hasSensitiveContent: false,
      noOfReviews: 9,
      productType: "Hoodies",
      animeType: "Dragon Ball Z",
      avgRating: 5,// show rating UI if less than 10 customer reviews
      allSizesAvailable: false,
      availableSizes: ["S", "M", "L"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"],
     },
     {
      name : "Trafalgar Law (New World) Hoodie",
      price: 1499,
      hasDiscount: true,
      discountedPrice: 1999,
      slug: 'trafalgar-law-hoodie',
      addedToWishlist: false,
      hoverImage : "products/law2.webp",
      initialImage : "products/law1.webp",
      isSoldOut: false,
      hasSensitiveContent: false,
      noOfReviews: 11,
      productType:"Hoodies",
      animeType: "One Piece",
      avgRating: 4.73,// show rating UI if less than 10 customer reviews
      allSizesAvailable: true,
      availableSizes: ["S"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"],
     },
     {
      name : "Hokage Cloak",
      price: 899,
      hasDiscount: true,
      discountedPrice: 2000,
      addedToWishlist: false,
      slug: "hokage-cloak",
      hoverImage : "products/hokagecloak1.webp",
      initialImage : "products/hokagecloak.webp",
      isSoldOut: false,
      productType:"Cloak",
      animeType :"Naruto",
      hasSensitiveContent: false,
      noOfReviews: 6,
      avgRating: 5,// show rating UI if less than 10 customer reviews
      allSizesAvailable: false,
      availableSizes: ["S", "M", "L", "XL", "XXL"],// agar 0 customer reviews 
      hasOffer: true,
      offerDueDate: new Date(),
      offerType: ["Limited Edition", "Neon Print", "Sleeveless"],
     }
];

router.get("/create",  async (req, res) => {
// const products = items;
try {
  const products = await Product.insertMany(items);
  return  res.status(200).json(products);
} catch (error) {
  console.log({message: error.message})
}
}); 


router.post("/", async (req,res) => {
  const data = req.body;
 try {
  const newProduct = new Product({
    ...data
  });

  await newProduct.save();
  return res.status(201).json(newProduct)
 } catch (error) {
res.status(200).json({message: error.message})
 }
});

router.get("/", async (req,res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    res.json({message: error.message})
  }
});

router.get("/:slug", async (req,res) => {
  const slug = req.params.slug;
  try {
    const existingProduct = await Product.find({slug});
    if(!existingProduct) {
      throw new Error("Product not found.");
    }

    res.status(200).json(existingProduct);
    
  } catch (error) {
    res.json({message: error.message})
  }
});


router.patch("/:id/cartFlag", async (req,res)=> {
  const id = req.params.id;
  try {
    const existingProduct = await Product.findById(id);
    if(!existingProduct) {
      throw new Error("Product not found");
    }

    await Product.updateOne({
      _id: id
    }, {
      addedToCart: false
    })

    res.json({success: true});
  } catch (error) {
    res.json({success: false})
  }
});


router.post("/filter", async (req,res) => {

  let {searchStr} = req.body;
  // console.log(searchStr);

  try {
    
    if(!searchStr) {
      throw new Error("search string not found...");
    }


searchStr = searchStr.trim();

const products = await Product.find({
  $or : [
    {"name" : {$regex: new RegExp(searchStr, "i") }}, 
    {"productType": {$regex: new RegExp(searchStr, "i")}},
    {"animeType": {$regex: new RegExp(searchStr, "i")}}
  ]
});

res.json({products: products});

  } catch (error) {
    res.json({message: error.message})
  }
})

export default router;