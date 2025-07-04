import React, { useEffect, useState } from "react";
import axios from "axios";
import './FoodList.css';
import BackButton from "./BackButton";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState({});
  const sessionId = localStorage.getItem("session_id") || "guest123";

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/foods/")
      .then(res => setFoods(res.data))
      .catch(err => console.error("Food load error:", err));
  }, []);

  const updateCart = (foodId, change) => {
    setCart(prev => {
      const newQty = (prev[foodId] || 0) + change;
      if (newQty <= 0) {
        const { [foodId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [foodId]: newQty };
    });
  };

  const handleCheckout = async () => {
    try {
      const walletRes = await axios.get(`http://127.0.0.1:8000/api/wallet/?search=${sessionId}`);
      const wallet = walletRes.data[0];

      const totalCost = Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = foods.find(f => f.id === parseInt(id));
        return sum + (item.price * qty);
      }, 0);

      if (!wallet || wallet.balance < totalCost) {
        alert("Insufficient balance.");
        return;
      }

      const payload = Object.entries(cart).map(([itemId, quantity]) => ({
        session_id: sessionId,
        item_id: parseInt(itemId),
        quantity: quantity
      }));

      await Promise.all(payload.map(item =>
        axios.post("http://127.0.0.1:8000/api/cart/", item)
      ));

      await axios.patch(`http://127.0.0.1:8000/api/wallet/${wallet.id}/`, {
        balance: wallet.balance - totalCost
      });

      alert("Order placed!");
      setCart({});
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err);
      alert("Order failed.");
    }
  };

  return (
    <div className="food-list-container">
      <BackButton />
      <h2 className="food-list-title">Food List</h2>
      <ul>
        {foods.map(food => {
          const qty = cart[food.id] || 0;
          return (
            <li key={food.id} className="food-item">
              <span className="food-name">{food.name}</span>
              <span className="food-price">₹{food.price}</span>
              {qty === 0 ? (
                <button className="food-btn" onClick={() => updateCart(food.id, 1)}>Add</button>
              ) : (
                <div className="quantity-controls">
                  <button onClick={() => updateCart(food.id, -1)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => updateCart(food.id, 1)}>+</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {Object.keys(cart).length > 0 && (
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button className="food-btn" onClick={handleCheckout}>Order Now</button>
        </div>
      )}
    </div>
  );
}

export default FoodList;
