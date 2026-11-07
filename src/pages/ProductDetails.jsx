
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ShoppingCart, Star, Package, CheckCircle
} from "lucide-react";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Fetch Product Details
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        // Convert API data into PDF Suggested Data Structure
        const formattedProduct = {
          id: data.id,
          name: data.title,
          category: data.category,
          price: data.price,
          rating: data.rating,
          stock: data.stock,
          image: data.thumbnail,
          description: data.description
        };

        setProduct(formattedProduct);

      } catch (err) {

        setError("Unable to load product details.");

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  // Check Already in Cart
  const isAdded = cart.some(
    (item) => item.id === Number(id)
  );

  // Add to Cart
  const addToCart = () => {

    if (!product || isAdded || product.stock === 0) {
      return;
    }

    const updatedCart = [
      ...cart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    ];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Loading
  if (loading) {
    return (
      <div className="details-loading">
        Loading Product Details...
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="details-loading">

        <h2>{error || "Product not found"}</h2>

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>

      </div>
    );
  }

  return (

    <div className="details-page">

      {/* Header */}
      <header className="details-header">

        <h2>ShopAdmin.</h2>

        <button onClick={() => navigate("/cart")}>

          <ShoppingCart size={18} />
          Cart ({cart.length})

        </button>

      </header>

      <main className="details-container">

        {/* Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/products")}
        >

          <ArrowLeft size={18} />
          Back to Products

        </button>

        {/* Product Details */}
        <div className="details-card">

          {/* Product Image */}
          <div className="details-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>

          {/* Product Information */}
          <div className="details-info">

            <span className="details-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            {/* Rating */}
            <div className="details-rating">

              <Star
                size={19}
                fill="#f59e0b"
                color="#f59e0b"
              />

              {product.rating} / 5

            </div>

            {/* Price */}
            <h2 className="details-price">
              ${product.price}
            </h2>

            {/* Availability */}
            <div className="availability">

              <Package size={19} />

              {product.stock > 0
                ? `${product.stock} items available`
                : "Out of Stock"}

            </div>

            {/* Description */}
            <div className="details-description">

              <h3>Product Description</h3>

              <p>{product.description}</p>

            </div>

            {/* Buttons */}
            <div className="details-actions">

              <button
                className="details-cart-btn"
                disabled={
                  isAdded || product.stock === 0
                }
                onClick={addToCart}
              >

                {isAdded ? (
                  <>
                    <CheckCircle size={18} />
                    Already in Cart
                  </>
                ) : product.stock === 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </>
                )}

              </button>

              <button
                className="details-back-btn"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ProductDetails;
