import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required field..."],

  },
  slug: {
    unique: true,
    type: String,
    required: [true, "Slug is required..."]
  },
  price: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    required: [true, "Product price is required field..."],
    cast: '{VALUE} not a number.'
  },
  hasDiscount: {
    type: Boolean,
    default: false,
    required: [true, "hasDiscount property required."]
  },
  discountedPrice: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    cast: '{VALUE} not a number.'
  },
  addedToWishlist: {
    type: Boolean
  },
  hoverImage : {
    type: String,
  },
  initialImage :{
    type: String,
  },
  isSoldOut: {
    type: Boolean,
    default: false,
  },
  hasSensitiveContent: {
    type: Boolean,
    default: false,
  },
  noOfReviews: {
    type: Number,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    default: 0,
  },
  productType: {
    type: String,
    required: [true, "product type is not provided..."],
    enum: {
      values: ['Tees', 'Hoodies', "Manga", "Uniform",'Cloak'],
      message: "Product Type: {VALUE}  not supported "
    }
  },
  animeType:{
    type: String,
    required: [true, "Anime Type is not provided..."],
    enum: {
      values: ["One Piece", "Tokyo Revengers","Naruto", "Dragon Ball Z" , "Jujutsu Kaisen", "Bleach"],
      message: "Anime: {VALUE} not supported."
    }
  },
  avgRating: {
    type: Number,
    min: [0, "rating must be greater than 0, got {VALUE}"],
    max: [5, 'rating should be out of 5, got {VALUE}'],
    get: (v) => v.toFixed(1),
    set: (v) => v.toFixed(1),
  },
  allSizesAvailable: {
    type: Boolean,
    default: false
  },
  availableSizes: {
    type: [String],
  },
  hasOffer: {
    type: Boolean,
    default: false
  },
  offerDueDate: {
    type: Date,
   default: Date.now()
  },
  offerType: {
    type: [String], 
  },
  addedToCart: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});


const Product = new mongoose.model("Product", ProductSchema);

export default Product;