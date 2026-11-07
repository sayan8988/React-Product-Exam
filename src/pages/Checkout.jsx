
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, ShoppingBag, CheckCircle
} from "lucide-react";
import "./Checkout.css";
import { saveActivity } from "../utils/activity";

function Checkout() {

    const navigate = useNavigate();

    const [cart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const [error, setError] = useState("");

    // Cart Calculation
    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const discount = subtotal * 0.10;
    const tax = (subtotal - discount) * 0.05;
    const finalTotal = subtotal - discount + tax;

    const formatPrice = (amount) => `$${amount.toFixed(2)}`;

    // Handle Input
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setError("");
    };

    // Place Order
    const handleSubmit = (e) => {

        e.preventDefault();

        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        const {
            fullName,
            email,
            phone,
            address,
            city,
            pincode
        } = formData;

        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !address.trim() ||
            !city.trim() ||
            !pincode.trim()
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!/^\d+$/.test(phone)) {
            setError("Phone number must contain only numbers.");
            return;
        }

        if (!/^\d+$/.test(pincode)) {
            setError("Pincode must contain only numbers.");
            return;
        }

        // Create Order
        const newOrder = {
            id: Date.now(),
            orderId: "ORD-" + Date.now(),
            customer: {
                fullName,
                email,
                phone,
                address,
                city,
                pincode
            },
            items: cart,
            subtotal,
            discount,
            tax,
            total: finalTotal,
            date: new Date().toLocaleDateString(),
            status: "Placed"
        };

        // Save Order
        const existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        localStorage.setItem(
            "orders",
            JSON.stringify([...existingOrders, newOrder])
        );

        // Clear Cart
        localStorage.setItem("cart", JSON.stringify([]));
        saveActivity(
            "order",
            "Order Placed Successfully",
            `Order ${newOrder.orderId} was placed successfully.`
        );

        alert("Order placed successfully!");

        navigate("/dashboard");
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <ShoppingBag size={55} />
                <h2>Your cart is empty.</h2>
                <button onClick={() => navigate("/products")}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (

        <div className="checkout-page">

            {/* Header */}
            <header className="checkout-header">

                <h2>ShopAdmin.</h2>

                <span>Secure Checkout</span>

            </header>

            <main className="checkout-container">

                <button
                    className="checkout-back"
                    onClick={() => navigate("/cart")}
                >
                    <ArrowLeft size={18} />
                    Back to Cart
                </button>

                <h1>Checkout</h1>
                <p className="checkout-subtitle">
                    Complete your information to place your order.
                </p>

                <div className="checkout-layout">

                    {/* Customer Form */}
                    <section className="customer-form-section">

                        <h2>Customer Information</h2>

                        {error && (
                            <div className="checkout-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    placeholder="Enter your full address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                />
                            </div>

                            <div className="form-row">

                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        placeholder="Enter pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <button type="submit" className="place-order-btn">
                                <CheckCircle size={19} />
                                Place Order
                            </button>

                        </form>

                    </section>

                    {/* Order Summary */}
                    <section className="checkout-summary">

                        <h2>Order Summary</h2>

                        <div className="checkout-products">

                            {cart.map((item) => (

                                <div className="checkout-product" key={item.id}>

                                    <img src={item.image} alt={item.name} />

                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>

                                    <strong>
                                        {formatPrice(item.price * item.quantity)}
                                    </strong>

                                </div>

                            ))}

                        </div>

                        <div className="checkout-total-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <div className="checkout-total-row discount-text">
                            <span>Discount (10%)</span>
                            <span>- {formatPrice(discount)}</span>
                        </div>

                        <div className="checkout-total-row">
                            <span>Tax (5%)</span>
                            <span>{formatPrice(tax)}</span>
                        </div>

                        <div className="checkout-divider"></div>

                        <div className="checkout-final-total">
                            <span>Final Amount</span>
                            <strong>{formatPrice(finalTotal)}</strong>
                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Checkout;
