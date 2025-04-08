import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  offerprice: { type: Number, default: 0 },
  reviews: { type: [String], default: [] } 
});

const Product = mongoose.model("Product", productSchema);

export default Product;

