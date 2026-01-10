import React from "react";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Cart 🛒</h1>
      <p>Your selected items will appear here.</p>

      <Link to="/checkout">
        <button style={{ padding: "10px 20px", marginTop: "20px", backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;