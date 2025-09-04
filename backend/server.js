// const express = require('express'); // old way
import express from "express"; // es6 way
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Products API works!");
});

app.post("/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



// best practice: irst connect DB, then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
        //by default,express w/o SSL runs on http://, not https://
      console.log("Server running on http://localhost:5000");
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();