// Import the Product model
const Product = require("../models/product");

// Get all products
const getProducts = async (req, res) => {
  try {
    // Find all products in MongoDB
    const products = await Product.find();

    // Send the products back to the client
    res.status(200).json(products);
  } catch (error) {
    // Handle database errors
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    // Get product data from the request body
    const { name, price, description } = req.body;

    // Create the product in MongoDB
    const product = await Product.create({
      name,
      price,
      description
    });

    // Send the newly created product back
    res.status(201).json(product);
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Failed to create product"
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    // Get the product ID from the URL
    const product = await Product.findByIdAndDelete(req.params.id);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // Confirm successful deletion
    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Failed to delete product"
    });
  }
};


module.exports = {
    getProducts,
    createProduct,
    deleteProduct
};