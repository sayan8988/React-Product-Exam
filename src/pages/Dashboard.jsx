
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard, ShoppingBag, ShoppingCart,
    Package, Users, LogOut, DollarSign,
    TrendingUp, Search, X
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const email = localStorage.getItem("userEmail") || "User";

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState(
        () => JSON.parse(localStorage.getItem("cart")) || []
    );
    const [orders, setOrders] = useState(
        () => JSON.parse(localStorage.getItem("orders")) || []
    );
    const [activities, setActivities] = useState(
        () => JSON.parse(localStorage.getItem("recentActivities")) || []
    );

    // Protect Dashboard
    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "https://dummyjson.com/products?limit=100"
                );

                if (!response.ok) {
                    throw new Error("Failed to load products");
                }

                const data = await response.json();

                const formattedProducts = data.products.map((product) => ({
                    id: product.id,
                    name: product.title,
                    category: product.category,
                    price: product.price,
                    rating: product.rating,
                    stock: product.stock,
                    image: product.thumbnail,
                    description: product.description
                }));

                setProducts(formattedProducts);
            } catch (error) {
                console.error("Dashboard product loading error:", error);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    // Refresh cart, orders and activity when Dashboard opens
    useEffect(() => {
        const refreshDashboardData = () => {
            setCart(JSON.parse(localStorage.getItem("cart")) || []);
            setOrders(JSON.parse(localStorage.getItem("orders")) || []);
            setActivities(
                JSON.parse(localStorage.getItem("recentActivities")) || []
            );
        };

        refreshDashboardData();
    }, []);

    const cartItems = cart.reduce(
        (total, item) => total + Number(item.quantity || 0), 0
    );

    const cartValue = cart.reduce(
        (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 0),
        0
    );

    // Dashboard Search
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();

        if (filteredProducts.length > 0) {
            navigate(`/products/${filteredProducts[0].id}`);
        } else if (search.trim()) {
            navigate("/products");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        navigate("/", { replace: true });
    };

    const formatActivityDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    return (
        <div className="dashboard-container">

            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="logo">SayanAdmin.</h2>

                <p className="menu-title">MENU</p>

                <div
                    className="menu-item active"
                    onClick={() => navigate("/dashboard")}
                >
                    <LayoutDashboard size={19} />
                    Dashboard
                </div>

                <div
                    className="menu-item"
                    onClick={() => navigate("/products")}
                >
                    <ShoppingBag size={19} />
                    Products
                </div>

                <div
                    className="menu-item"
                    onClick={() => navigate("/cart")}
                >
                    <ShoppingCart size={19} />
                    Cart
                </div>

                <div
                    className="menu-item"
                    onClick={() => navigate("/orders")}
                >
                    <Package size={19} />
                    Orders
                </div>

                <div
                    className="menu-item"
                    onClick={() => navigate("/profile")}
                >
                    <Users size={19} />
                    Profile
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={19} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <h2>Dashboard</h2>
                        <p>Welcome back! Here's your store overview.</p>
                    </div>

                    <div className="user-info">
                        <div className="user-avatar">
                            {email[0].toUpperCase()}
                        </div>
                        <span>{email}</span>
                    </div>
                </header>

                {/* Dashboard Search */}
                <section className="dashboard-search-section">
                    <form className="dashboard-search" onSubmit={handleSearch}>
                        <Search size={20} />

                        <input
                            type="text"
                            placeholder="Search products by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {search && (
                            <button
                                type="button"
                                className="clear-search"
                                onClick={() => setSearch("")}
                            >
                                <X size={18} />
                            </button>
                        )}

                        <button type="submit" className="search-submit">
                            Search
                        </button>
                    </form>

                    {search.trim() && (
                        <div className="dashboard-search-results">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.slice(0, 5).map((product) => (
                                    <div
                                        className="dashboard-search-result"
                                        key={product.id}
                                        onClick={() =>
                                            navigate(`/products/${product.id}`)
                                        }
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />
                                        <div>
                                            <strong>{product.name}</strong>
                                            <span>₹{product.price}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="dashboard-no-results">
                                    {loadingProducts
                                        ? "Loading products..."
                                        : "No products found."}
                                </p>
                            )}
                        </div>
                    )}
                </section>

                {/* Summary Cards */}
                <section className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-icon blue">
                            <ShoppingBag />
                        </div>
                        <p>Total Products</p>
                        <h2>
                            {loadingProducts ? "..." : products.length}
                        </h2>
                        <span>Store inventory</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            <ShoppingCart />
                        </div>
                        <p>Cart Items</p>
                        <h2>{cartItems}</h2>
                        <span>Items in your cart</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">
                            <DollarSign />
                        </div>
                        <p>Total Cart Value</p>
                        <h2>₹{cartValue.toLocaleString("en-IN")}</h2>
                        <span>Current cart amount</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon purple">
                            <TrendingUp />
                        </div>
                        <p>Total Orders</p>
                        <h2>{orders.length}</h2>
                        <span>Orders placed</span>
                    </div>

                </section>

                {/* Recent Activity */}
                <section className="activity-section">
                    <div className="activity-heading">
                        <h3>Recent Activity</h3>
                        <span>Latest updates</span>
                    </div>

                    {activities.length > 0 ? (
                        activities.slice(0, 5).map((activity, index) => (
                            <div className="activity-item" key={activity.id || index}>
                                <span
                                    className={`activity-dot ${
                                        activity.type === "order"
                                            ? "orange-dot"
                                            : activity.type === "remove"
                                            ? "red-dot"
                                            : "blue-dot"
                                    }`}
                                ></span>

                                <div>
                                    <h4>{activity.title}</h4>
                                    <p>{activity.description}</p>
                                    <small>
                                        {formatActivityDate(activity.date)}
                                    </small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="activity-empty">
                            <Package size={30} />
                            <h4>No recent activity</h4>
                            <p>
                                Product and order activities will appear here.
                            </p>
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
}

export default Dashboard;
