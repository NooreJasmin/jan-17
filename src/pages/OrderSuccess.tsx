import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>🎉 Order Successful!</h1>
      <p>Thank you for your order. Your food will be delivered soon.</p>

      <Link to="/">
        <button style={{ padding: "10px 20px", marginTop: "20px", backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccess;