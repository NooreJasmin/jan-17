import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface CartItem {
  name: string;
  price: number;
  img?: string;
  source?: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

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

  // ➕ Increase quantity
  const increaseQty = (item: CartItem) => {
    const updatedCart = cart.map(c =>
      c.name === item.name && c.source === item.source
        ? { ...c, quantity: c.quantity + 1 }
        : c
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ➖ Decrease quantity
  const decreaseQty = (item: CartItem) => {
    const updatedCart = cart
      .map(c =>
        c.name === item.name && c.source === item.source
          ? { ...c, quantity: c.quantity - 1 }
          : c
      )
      .filter(c => c.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  margin: "15px 0",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: 10
                }}
              >
                <strong>{item.name}</strong> – ₹{item.price}

                <div style={{ marginTop: 8 }}>
                  <button onClick={() => decreaseQty(item)}>−</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ₹{total}</h3>
        </>
      )}

      <Link to="/checkout">
        <button
          style={{
            padding: "10px 20px",
            marginTop: 20,
            backgroundColor: "darkcyan",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;