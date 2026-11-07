
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Package, Eye, X, ShoppingBag
} from "lucide-react";
import "./Orders.css";

function Orders() {

  const navigate = useNavigate();

  const [orders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Handle different order data structures
  const getCustomer = (order) => order.customer || order;

  const getOrderId = (order) =>
    order.orderId || order.id || "N/A";

  const getCustomerName = (order) => {
    const customer = getCustomer(order);
    return customer.fullName || customer.name || "Customer";
  };

  const getDate = (order) =>
    order.date || order.createdAt || "N/A";

  const getTotal = (order) =>
    order.total ?? order.finalTotal ?? order.amount ?? 0;

  const getStatus = (order) =>
    order.status || "Placed";

  const getItems = (order) =>
    order.items || order.cart || [];

  const formatPrice = (amount) =>
    `$${Number(amount).toFixed(2)}`;

  return (

    <div className="orders-page">

      {/* Header */}
      <header className="orders-header">

        <h2>ShopAdmin.</h2>

        <button onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} />
          Dashboard
        </button>

      </header>

      <main className="orders-container">

        <div className="orders-title">
          <div>
            <h1>My Orders</h1>
            <p>Manage and track your previous orders.</p>
          </div>

          <span>{orders.length} Total Orders</span>
        </div>

        {orders.length === 0 ? (

          /* Empty Orders */
          <div className="empty-orders">

            <ShoppingBag size={60} />

            <h2>No orders found.</h2>

            <p>You have not placed any orders yet.</p>

            <button onClick={() => navigate("/products")}>
              Explore Products
            </button>

          </div>

        ) : (

          /* Orders Table */
          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order, index) => (

                  <tr key={order.id || order.orderId || index}>

                    <td className="order-id">
                      {getOrderId(order)}
                    </td>

                    <td>{getCustomerName(order)}</td>

                    <td>{getDate(order)}</td>

                    <td className="order-amount">
                      {formatPrice(getTotal(order))}
                    </td>

                    <td>
                      <span className="order-status">
                        {getStatus(order)}
                      </span>
                    </td>

                    <td>
                      <button
                        className="view-order-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* Order Details */}
        {selectedOrder && (

          <div className="order-modal-overlay">

            <div className="order-modal">

              <div className="modal-header">

                <h2>Order Details</h2>

                <button
                  onClick={() => setSelectedOrder(null)}
                >
                  <X size={21} />
                </button>

              </div>

              <div className="modal-body">

                <p>
                  <strong>Order ID:</strong>{" "}
                  {getOrderId(selectedOrder)}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {getCustomerName(selectedOrder)}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {getCustomer(selectedOrder).email || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {getCustomer(selectedOrder).phone || "N/A"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {getCustomer(selectedOrder).address || "N/A"}
                </p>

                <p>
                  <strong>City:</strong>{" "}
                  {getCustomer(selectedOrder).city || "N/A"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {getDate(selectedOrder)}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {getStatus(selectedOrder)}
                </p>

                <h3>Ordered Products</h3>

                {getItems(selectedOrder).length > 0 ? (

                  getItems(selectedOrder).map((item, index) => (

                    <div className="order-detail-item" key={item.id || index}>

                      <img
                        src={item.image || item.thumbnail}
                        alt={item.name || item.title}
                      />

                      <div>
                        <h4>{item.name || item.title}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>

                      <strong>
                        {formatPrice(item.price * item.quantity)}
                      </strong>

                    </div>

                  ))

                ) : (
                  <p>Product details not available.</p>
                )}

                <div className="modal-total">
                  Total Amount: {formatPrice(getTotal(selectedOrder))}
                </div>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

export default Orders;
