import React from "react";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Checkout 🧾</h1>
      <p>Fill your payment and delivery details here.</p>

      <Link to="/ordersuccess">
        <button style={{ padding: "10px 20px", marginTop: 20, backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>
          Confirm Order
        </button>
      </Link>
    </div>
  );
};

export default Checkout;