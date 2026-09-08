import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import {
  FiShoppingBag,
  FiUser,
  FiPlus,
  FiTrash2
} from "react-icons/fi";

function App() {
  const API_URL = "http://localhost:5000/api/products";
  
  // Track whether products are being loaded
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });

  const [products, setProducts] = useState([]);

  // Store an error message if the API request fails
  const [error, setError] = useState("");

useEffect(() => {
// Fetch products from the backend
// Fetch products from the backend
const fetchProducts = async () => {

  try {

    // Send GET request to the API
    const response = await axios.get(API_URL);

    // Store the returned products
    setProducts(response.data);

  } catch (error) {

    console.error("Failed to fetch products:", error);

    // Store an error message
    setError("Failed to load products. Please try again.");

  } finally {

    // Loading is finished
    setLoading(false);
  }
};

  fetchProducts();
}, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.description.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(formData.price) <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim()
      });

      setProducts([
        ...products,
        response.data
      ]);

      setFormData({
        name: "",
        price: "",
        description: ""
      });
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setProducts(
        products.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="app">

      <header className="header">

        <div className="logo">
          <FiShoppingBag className="logo-icon" />

          <span>
            ProductCatalogue
          </span>
        </div>

        <nav className="navigation">

          <a href="#" className="active">
            Home
          </a>

          <a href="#">
            Products
          </a>

          <button className="profile">
            <FiUser />
          </button>

        </nav>

      </header>


      <main className="main">

        <section className="page-intro">

          <h1>
            Mini Product Catalogue
          </h1>

          <p>
            Browse, add and manage your products all in one place.
          </p>

        </section>


        <form
          className="add-product"
          onSubmit={handleSubmit}
        >

          <h2>
            Add New Product
          </h2>

          <div className="form-row">

            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />

            </div>


            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />

            </div>

          </div>


          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />

          </div>


          <button
            type="submit"
            className="add-button"
          >

            <FiPlus />

            <span>
              Add Product
            </span>

          </button>

        </form>


        <section className="products-section">

          <div className="products-header">

            <h2>
              Products
            </h2>

            <span>
              {products.length} products
            </span>

          </div>


          <div className="products-grid">

          {loading ? (

              <div className="empty-products">
                <p>Loading products...</p>
              </div>

            ) : error ? (

              <div className="empty-products">
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>

            ) : products.length === 0 ? (

              <div className="empty-products">
                <h3>No products yet</h3>
                <p>Add your first product using the form above.</p>
              </div>

            ) : (

              products.map((product) => (

                <article
                  className="product-card"
                  key={product._id}
                >
                  <h3>{product.name}</h3>

                  <p className="product-price">
                    ₦{product.price.toLocaleString()}
                  </p>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FiTrash2 />
                    <span>Delete</span>
                  </button>

                </article>

              ))

            )}
        </div>

        </section>

      </main>


      <footer className="footer">

        <p>
          © 2026 Mini Product Catalogue. All rights reserved.
        </p>

        <p>
          Built with React
        </p>

      </footer>

    </div>
  );
}

export default App;