
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Trash2, ShoppingCart, Minus, Plus
} from "lucide-react";
import "./Cart.css";
import { saveActivity } from "../utils/activity";

function Cart() {

  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // Save Cart in LocalStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Discount 10%
  const discount = subtotal * 0.10;

  // Tax 5% after discount
  const tax = (subtotal - discount) * 0.05;

  // Final Total
  const finalTotal = subtotal - discount + tax;

  // Increase Quantity
  const increaseQuantity = (id) => {

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  };

 
const removeItem = (id) => {
    const removedItem = cart.find((item) => item.id === id);

    if (removedItem) {
        saveActivity(
            "remove",
            "Product Removed from Cart",
            `${removedItem.name} was removed from your cart.`
        );
    }

    setCart((prevCart) =>
        prevCart.filter((item) => item.id !== id)
    );
};

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const formatPrice = (amount) =>
    `$${amount.toFixed(2)}`;

  return (

    <div className="cart-page">

      {/* Header */}
      <header className="cart-header">

        <h2>ShopAdmin.</h2>

        <button onClick={() => navigate("/products")}>
          <ShoppingCart size={18} />
          Continue Shopping
        </button>

      </header>

      <main className="cart-container">

        <div className="cart-title">
          <h1>Shopping Cart</h1>
          <p>You have {totalItems} item(s) in your cart.</p>
        </div>

        {cart.length === 0 ? (

          /* Empty Cart */
          <div className="empty-cart">

            <ShoppingCart size={65} />

            <h2>Your cart is empty.</h2>

            <p>Add some products to get started.</p>

            <button onClick={() => navigate("/products")}>
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="cart-layout">

            {/* Cart Items */}
            <section className="cart-items">

              {cart.map((item) => (

                <div className="cart-item" key={item.id}>

                  <div className="cart-product-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-product-info">

                    <h3>{item.name}</h3>

                    <p>Price: {formatPrice(item.price)}</p>

                    <div className="quantity-control">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={15} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                  </div>

                  <div className="cart-item-right">

                    <h3>
                      {formatPrice(item.price * item.quantity)}
                    </h3>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </section>

            {/* Cart Summary */}
            <section className="cart-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row discount-row">
                <span>Discount (10%)</span>
                <span>- {formatPrice(discount)}</span>
              </div>

              <div className="summary-row">
                <span>Tax (5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Final Total</span>
                <h2>{formatPrice(finalTotal)}</h2>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <button
                className="continue-btn"
                onClick={() => navigate("/products")}
              >
                <ArrowLeft size={17} />
                Continue Shopping
              </button>

            </section>

          </div>

        )}

      </main>

    </div>
  );
}

export default Cart;
