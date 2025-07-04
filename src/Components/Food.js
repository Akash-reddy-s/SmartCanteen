import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import './Food.css';
import Footer from "../Components/Footer";
import axios from "axios";

const Food = () => {

  const sessionId = localStorage.getItem("session_id") || "guest123";
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/wallet/?search=${sessionId}`)
      .then(res => {
        if (res.data.length > 0) {
          setWallet(res.data[0].balance);
        }
      })
      .catch(err => {
        console.error("Failed to fetch wallet:", err);
      });
  }, [sessionId]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Smart Canteen</h1>
          <p>Great food. Great moments. Delivered smartly.</p>
          <Link to="/restaurent">
            <button className="hero-btn">Order Now</button>
          </Link>
        </div>
      </section>


      <section className="wallet-section">
        <h2>Your Wallet Balance</h2>
        <p className="wallet-amount">₹{wallet}</p>
        <Link to="/addcash">
          <button className="wallet-btn">Add Cash</button>
        </Link>
      </section>


      <section className="feature-cards">
        <div className="card">
          <img src="/assets/canteen.gif" alt="Restaurants" />
          <h4>Explore Canteens</h4>
          <p>Browse all available restaurants in your campus</p>
          <Link to="/restaurent">
            <button>Explore</button>
          </Link>
        </div>

        <div className="card">
          <img src="/assets/order.gif" alt="Track Orders" />
          <h4>Track Orders</h4>
          <p>See your order history</p>
          <Link to="/orders">
            <button>Track</button>
          </Link>
        </div>

        <div className="card">
          <img src="/assets/cart.gif" alt="Cart" />
          <h4>Your Cart</h4>
          <p>Check what you’ve added before payment</p>
          <Link to="/cart">
            <button>Open</button>
          </Link>
        </div>

        

      </section>

      <Footer />
    </div>
  );
};

export default Food;
