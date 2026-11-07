
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search, ShoppingCart, LogOut, Star
} from "lucide-react";
import "./Products.css";
import { saveActivity } from "../utils/activity";

function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("");

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    // Fetch Products from API
    useEffect(() => {

        const fetchProducts = async () => {

            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://dummyjson.com/products?limit=100"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                // Convert API data into PDF Suggested Data Structure
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
                console.log("PRODUCT DATA:", formattedProducts);

            } catch (err) {
                setError("Unable to load products. Please try again.");
            } finally {
                setLoading(false);
            }

        };

        fetchProducts();

    }, []);

    // Get Categories
    const categories = [
        ...new Set(products.map((product) => product.category))
    ];

    // Search and Filter
    let filteredProducts = products.filter((product) => {

        const matchSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "all" || product.category === category;

        return matchSearch && matchCategory;

    });

    // Sorting
    if (sort === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Add to Cart
    const addToCart = (product) => {

        const existing = cart.find(
            (item) => item.id === product.id
        );

        if (existing) return;

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
        saveActivity(
            "add",
            "Product Added to Cart",
            `${product.name} was added to your cart.`
        );

    };

    // Check Already Added
    const isAdded = (id) => {
        return cart.some((item) => item.id === id);
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    if (loading) {
        return <div className="loading">Loading Products...</div>;
    }

    if (error) {
        return (
            <div className="loading">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (

        <div className="products-page">

            {/* Header */}
            <header className="products-header">

                <h2>ShopAdmin.</h2>

                <div className="header-actions">

                    <button onClick={() => navigate("/cart")}>
                        <ShoppingCart size={19} />
                        Cart ({cart.length})
                    </button>

                    <button onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </header>

            {/* Main Content */}
            <main className="products-content">

                <div className="products-title">

                    <div>
                        <h1>Products</h1>
                        <p>Explore and manage your store products.</p>
                    </div>

                    <span>{filteredProducts.length} Products Found</span>

                </div>

                {/* Search and Filters */}
                <div className="product-filters">

                    <div className="search-box">

                        <Search size={20} />

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >

                        <option value="all">All Categories</option>

                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}

                    </select>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >

                        <option value="">Default Sorting</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>

                    </select>

                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (

                    <div className="empty-products">

                        <h2>No products found.</h2>
                        <p>Try changing your search or category.</p>

                    </div>

                ) : (

                    <div className="product-grid">

                        {filteredProducts.map((product) => (

                            <div className="product-card" key={product.id}>

                                {/* Product Image */}
                                <div
                                    className="product-image"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                </div>

                                <div className="product-info">

                                    <span className="product-category">
                                        {product.category}
                                    </span>

                                    {/* Product Name */}
                                    <h3
                                        onClick={() => navigate(`/products/${product.id}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {product.name}
                                    </h3>

                                    {/* Rating */}
                                    <div className="product-rating">

                                        <Star
                                            size={16}
                                            fill="#f59e0b"
                                            color="#f59e0b"
                                        />

                                        {product.rating}

                                    </div>

                                    {/* Price and Stock */}
                                    <div className="product-bottom">

                                        <h3>${product.price}</h3>

                                        <span className={
                                            product.stock > 0 ? "in-stock" : "out-stock"
                                        }>
                                            {product.stock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </span>

                                    </div>

                                    {/* Add to Cart */}
                                    <button
                                        className="add-cart-btn"
                                        disabled={
                                            isAdded(product.id) || product.stock === 0
                                        }
                                        onClick={() => addToCart(product)}
                                    >

                                        {isAdded(product.id)
                                            ? "Already Added"
                                            : product.stock === 0
                                                ? "Out of Stock"
                                                : "Add to Cart"}

                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default Products;
