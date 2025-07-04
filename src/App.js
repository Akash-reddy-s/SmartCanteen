import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurent from './Components/Restaurent';
import Login from "./Components/Login";
import Home from './Pages/Home';
import FoodList from "./Components/FoodList";
import Cart from './Components/Cart'; 
import AddCash from './Components/AddCash';
import Orders from './Components/Order';



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} /> 
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Navigate to="/home" replace />} /> 
          <Route exact path="/restaurent" element={<Restaurent />} /> 
          <Route exact path="/logout" element={<Navigate to="/" replace />} /> 
          <Route exact path="/foodlist" element={<FoodList />} />
          <Route exact path="/cart" element={<Cart />} /> 
          <Route exact path="/addcash" element={<AddCash/>} />
          <Route exact path="/orders" element={<Orders/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
