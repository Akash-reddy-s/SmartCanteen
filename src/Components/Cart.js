import React, { useEffect, useState } from "react";
import axios from "axios";
import './Cart.css';
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Footer from "./Footer";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("session_id") || "guest123";

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cart/?session_id=${sessionId}`)
      .then(res => setItems(res.data))
      .catch(err => console.error("Cart load error:", err));
  }, [sessionId]);

  const total = items.reduce((sum, item) => sum + item.quantity * item.item.price, 0);

  const handleProceedToPay = async () => {
    if (items.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

    try {

      await Promise.all(
        items.map(item =>
          axios.delete(`http://127.0.0.1:8000/api/cart/${item.id}/`)
        )
      );

      await axios.post("http://127.0.0.1:8000/api/orders/", {
        session_id: sessionId,
        order_id: orderId,
        total_amount: total
      });

      localStorage.setItem("lastOrderId", orderId);
      setItems([]);
      alert("✅ Payment Successful");


      navigate("/orders");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Payment failed");
    }
  };

  return (
    <div className="cart">
    <BackButton/>
    <div className="cart-container fluid">
      <h2 className="cart-title">Your Cart</h2>

      <ul className="cart-list">
        {items.map((cartItem, index) => (
          <li key={index} className="cart-item">
            <span className="item-name">{cartItem.item.name}</span>
            <span className="item-details">
              ₹{cartItem.item.price} × {cartItem.quantity}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="total-price">Total: ₹{total}</h3>

      {items.length > 0 && (
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button className="food-btn" onClick={handleProceedToPay}>
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
      <Footer/>
    </div>
  );
}

export default Cart;
