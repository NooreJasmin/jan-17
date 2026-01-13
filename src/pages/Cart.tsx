import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const checkLogin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("⚠️ Please login first!");
      navigate("/login");
    }
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Cart 🛒</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item: any, index: number) => (
            <li key={index} style={{ margin: "10px 0", borderBottom: "1px solid #ccc", paddingBottom: 5 }}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}

      <Link to="/checkout">
        <button style={{ padding: "10px 20px", marginTop: 20, backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;