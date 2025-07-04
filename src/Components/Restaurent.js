import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Restaurent.css';
import BackButton from "./BackButton";
import Footer from "./Footer";
import axios from "axios";

const Restaurent = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/restaurants/")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error("Failed to load restaurants:", err));
  }, []);

  const handleOrderClick = (restaurantName) => {
    navigate("/foodlist", {
      state: { name: restaurantName }
    });
  };

  return (
    <div className="restaurent-container">
      <BackButton />
      <h1 className="page-title">Available Canteens</h1>

      <Container>
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div className="restaurant-card no-image" key={restaurant.id}>
              <div className="restaurant-info">
                <h2>{restaurant.name}</h2>
                <p><strong>Contact:</strong> {restaurant.contact}</p>
                <p><strong>Food Type:</strong> {restaurant.food_type}</p>
                <button onClick={() => handleOrderClick(restaurant.name)} className="order-btn">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Restaurent;
