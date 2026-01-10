import React from "react";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Checkout 🧾</h1>
      <p>Fill your payment and delivery details here.</p>

      <Link to="/ordersuccess">
        <button style={{ padding: "10px 20px", marginTop: "20px", backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Confirm Order
        </button>
      </Link>
    </div>
  );
};

export default Checkout;