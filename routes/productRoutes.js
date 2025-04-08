import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.js";

const router = express.Router();

// 🔹 POST - Add a new product
router.post("/", async (req, res) => {
    try {
        const { title, price, description, category, image, rating, discount, offerprice, reviews } = req.body;

        // 🔹 Validation Check
        if (!title || !price || !description || !category || !image) {
            return res.status(400).json({ message: "All required fields (title, price, description, category, image) must be filled!" });
        }

        const newProduct = new Product({
            title,
            price,
            description,
            category,
            image,
            rating: rating || 0,   // Default to 0 if not provided
            discount: discount || 0,
            offerprice: offerprice || 0,
            reviews: Array.isArray(reviews) ? reviews : [] // Ensure reviews is an array
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: "Error saving product", error: err.message });
    }
});

// 🔹 GET - Retrieve all products
router.get("/", async (req, res) => {
    const category = req.query.category;
    try {
      let query = {};
      if (category) {
        query.category = category;
      }
      const products = await Product.find(query);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  });

// 🔹 GET - Retrieve a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving product" });
    }
});

// 🔹 PUT - Update a product

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


       

// 🔹 DELETE - Remove a product
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID format" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting product" });
    }
});

export default router;
