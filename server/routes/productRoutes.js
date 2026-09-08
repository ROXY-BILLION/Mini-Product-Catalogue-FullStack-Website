// Import Express
const express = require("express");

// Import the product controller
const { getProducts,createProduct,deleteProduct } = require("../controller/productController");

// Create a router
const router = express.Router();

// GET /api/products
router.get("/", getProducts);

// POST /api/products
router.post("/", createProduct);

// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

// Export the router
module.exports = router;