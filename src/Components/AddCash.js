import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddCash.css";
import BackButton from "./BackButton";

function AddCash() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("session_id") || "guest123";

  const handleAddCash = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/wallet/?search=${sessionId}`);
      const walletExists = res.data.length > 0;

      if (walletExists) {
        const wallet = res.data[0];
        const updatedBalance = wallet.balance + parseFloat(amount);

        await axios.patch(`http://127.0.0.1:8000/api/wallet/${wallet.id}/`, {
          balance: updatedBalance
        });

        alert("Cash added successfully.");
      } else {
        await axios.post("http://127.0.0.1:8000/api/wallet/", {
          session_id: sessionId,
          balance: parseFloat(amount)
        });

        alert("Wallet created and cash added.");
      }

      navigate("/home");
    } catch (err) {
      console.error("Add cash error:", err);
      alert("Failed to add cash.");
    }
  };

  return (
    <div className="add-cash-container">
      <BackButton />
      <h2>Add Cash to Wallet</h2>
      <div className="cash-form">
        <input
          type="number"
          placeholder="Enter amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddCash}>Add Cash</button>
      </div>
    </div>
  );
}

export default AddCash;
