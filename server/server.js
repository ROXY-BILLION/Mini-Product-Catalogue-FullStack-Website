const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const productRoutes = require("./routes/productRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Mini Product Catalogue API is running"
  });
});

// START SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});