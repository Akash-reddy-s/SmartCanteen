import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import BackButton from "./BackButton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const sessionId = localStorage.getItem("session_id") || "guest123";
  const lastOrderId = localStorage.getItem("lastOrderId");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/orders/?search=${sessionId}`)
      .then(res => {

        const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrders(sorted);
      })
      .catch(err => console.error("Order fetch error:", err));
  }, [sessionId]);

  return (
    <div className="orders-container">
      <BackButton />
      <h2 className="orderhead">Your Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order.id} className={`order-card ${order.order_id === lastOrderId ? "highlight-order" : ""}`}>
              <p><strong>Order ID:</strong> {order.order_id}</p>
              <p><strong>Total:</strong> ₹{order.total_amount}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
