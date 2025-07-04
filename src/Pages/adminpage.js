import React from "react";
import "./adminpage.css";

const AdminPage = () => {
    return (
        <div className="main">
            <div className="admin-container">
                <h1 className="adminhead">Admin's DashBoard</h1>
                <div className="admin-box">
                <button type="button" className="adminbtn">Manage Canteen</button>
                <button type="button" className="adminbtn">View Canteen</button>
                <button type="button" className="adminbtn">Add / Delete Food</button>
                <button type="button" className="adminbtn">View Orders</button>
                </div>
            </div>
        </div>

    );
};

export default AdminPage;
