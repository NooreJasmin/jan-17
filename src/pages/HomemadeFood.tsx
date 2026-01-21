import React, { useState } from "react";
import "../styles/HomemadeFood.css";

type Category = "all" | "snacks" | "meals" | "desserts";

interface Girl {
  id: number;
  img: string;
  name: string;
  brand: string;
  address: string;
  mobile: string;
}

interface FoodItem {
  id: number;
  girlId: number;
  name: string;
  price: number;
  category: Category;
  img: string;
}

/* 👩‍🍳 CHEF DETAILS */
const girls: Girl[] = [
  { id: 1, img: "/image/chef1.png", name: "Anitha", brand: "Anitha Home Foods", address: "Chennai", mobile: "9876543210" },
  { id: 2, img: "/image/chef2.png", name: "Priya", brand: "Priya Kitchen", address: "Coimbatore", mobile: "9123456780" },
  { id: 3, img: "/image/chef3.png", name: "Lakshmi", brand: "Lakshmi Homemade", address: "Madurai", mobile: "9988776655" },
  { id: 4, img: "/image/chef4.png", name: "Meena", brand: "Meena Traditional Foods", address: "Coimbatore", mobile: "8877665544" },
  { id: 5, img: "/image/chef5.png", name: "Arun", brand: "Arun Home Foods", address: "Salem", mobile: "8899001122" },
  { id: 6, img: "/image/chef6.png", name: "Fathima", brand: "Bismillah Hotel", address: "Pallavaram", mobile: "8897001122" },
  { id: 7, img: "/image/chef7.png", name: "Sathish", brand: "Sathish Kai Vannam", address: "Pozhichalur", mobile: "7336001122" },
];

/* 🍱 FOOD ITEMS */
const foods: FoodItem[] = [
  { id: 1, girlId: 1, name: "Veg Meals", price: 100, category: "meals", img: "/image/vegmeals.png" },
  { id: 2, girlId: 1, name: "Samosa", price: 40, category: "snacks", img: "/image/samosa.png" },
  { id: 3, girlId: 1, name: "Egg Fried Rice", price: 90, category: "meals", img: "/image/eggfriedrice.png" },
  { id: 4, girlId: 1, name: "Paneer Butter Masala", price: 150, category: "meals", img: "/image/paneer.png" },
  { id: 5, girlId: 5, name: "Chicken Biryani", price: 200, category: "meals", img: "/image/chickenbri.png" },
  { id: 6, girlId: 2, name: "Chocolate Cake", price: 60, category: "desserts", img: "/image/chococake.jpg" },
  { id: 8, girlId: 2, name: "Murukku", price: 30, category: "snacks", img: "/image/muruku.png" },
  { id: 9, girlId: 2, name: "Carrot Halwa", price: 60, category: "desserts", img: "/image/carrathalwa.png" },
  { id: 10, girlId: 3, name: "Idly with Sambar", price: 90, category: "meals", img: "/image/idly.png" },
  { id: 11, girlId: 3, name: "Brownie", price: 100, category: "snacks", img: "/image/brownie.png" },
  { id: 12, girlId: 4, name: "Vegetable Soup", price: 90, category: "snacks", img: "/image/vegsoup.png" },
  { id: 7, girlId: 4, name: "Pani Puri", price: 30, category: "snacks", img: "/image/pani.png" },
  { id: 13, girlId: 5, name: "Aval Payasam", price: 90, category: "desserts", img: "/image/avalpayasam.png" },
  { id: 14, girlId: 6, name: "Mutton Biriyani", price: 350, category: "meals", img: "/image/muttonbiryani.png" },
  { id: 15, girlId: 6, name: "Bread Halwa", price: 90, category: "desserts", img: "/image/breadhalwa.png" },
  { id: 17, girlId: 7, name: "Fish Fry", price: 160, category: "meals", img: "/image/fishfry.png" },
];

const HomemadeFood: React.FC = () => {
  const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  // Pre-Order States
  const [preOrderFood, setPreOrderFood] = useState<FoodItem | null>(null);
  const [orderTime, setOrderTime] = useState("");

  const filteredFoods = foods.filter((food) => {
    if (selectedGirl && food.girlId !== selectedGirl.id) return false;
    if (category !== "all" && food.category !== category) return false;
    return true;
  });

  const handleAddToCart = (food: FoodItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex(
      (item: any) => item.name === food.name && item.source === "homemade"
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        name: food.name,
        price: food.price,
        img: food.img,
        quantity: 1,
        source: "homemade",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setPopupText(`${food.name} added to cart 🛒`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handlePreOrderSubmit = () => {
    if (!orderTime) return alert("Please select a date and time!");

    const now = new Date();
    const selected = new Date(orderTime);
    const diffInMs = selected.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 2) {
      alert("⚠️ Error: Minimum 2 hours preparation time required!");
    } else if (diffInHours > 48) {
      alert("⚠️ Error: Maximum pre-order window is 48 hours!");
    } else {
      alert(`✅ Pre-order placed for ${preOrderFood?.name}!\nScheduled for: ${selected.toLocaleString()}`);
      setPreOrderFood(null);
      setOrderTime("");
    }
  };

  return (
    <div className="homemade-body">
      <header>
        <h1 className="page-title">Homemade Food</h1>
        <p>Fresh • Hygienic • Made with Love</p>
      </header>

      {/* CHEF SELECTION ROW */}
      {!selectedGirl && (
        <div className="girl-row">
          {girls.map((girl) => (
            <img
              key={girl.id}
              src={girl.img}
              alt={girl.name}
              className="girl"
              onClick={() => setSelectedGirl(girl)}
            />
          ))}
        </div>
      )}

      {/* SELECTED CHEF PROFILE CARD */}
      {selectedGirl && (
        <>
          <button id="backBtn" onClick={() => setSelectedGirl(null)} style={{ margin: "15px" }}>
            ⬅ Back
          </button>

          <div className="girl-card-left">
            <img src={selectedGirl.img} alt={selectedGirl.name} className="girl-avatar-left" />
            <div className="girl-details-left">
              <h2>{selectedGirl.brand}</h2>
              <p className="tagline">Authentic homemade meals delivered fresh</p>
              <div className="meta">
                <p>👤 {selectedGirl.name}</p>
                <p>📍 {selectedGirl.address}</p>
                <p>📞 {selectedGirl.mobile}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CATEGORY BAR */}
      <div className="category">
        {(["all", "snacks", "meals", "desserts"] as Category[]).map((cat) => (
          <span
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat.toUpperCase()}
          </span>
        ))}
      </div>

      {/* FOOD GRID */}
      <div className="food-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredFoods.map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.img} alt={food.name} />
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                <button onClick={() => handleAddToCart(food)} style={{ padding: "8px 10px" }}>
                    Add to Cart
                </button>
                <button 
                  onClick={() => setPreOrderFood(food)} 
                  style={{ background: "#e67e22", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
                >
                  Pre-Order
                </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🕒 PRE-ORDER MODAL */}
      {preOrderFood && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="modal-content" style={{ background: "white", padding: "30px", borderRadius: "15px", textAlign: "center", width: "320px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            <h3>Pre-Order {preOrderFood.name}</h3>
            <p style={{ fontSize: "13px", color: "#555", margin: "10px 0" }}>
                Order between 2 to 48 hours in advance.
            </p>
            <input 
              type="datetime-local" 
              value={orderTime} 
              onChange={(e) => setOrderTime(e.target.value)} 
              style={{ width: "90%", padding: "10px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setPreOrderFood(null)} style={{ padding: "10px 20px", cursor: "pointer", border: "1px solid #ccc", borderRadius: "5px" }}>Cancel</button>
              <button onClick={handlePreOrderSubmit} style={{ background: "darkcyan", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Confirm Order</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="footer">
        <h3>{selectedGirl ? selectedGirl.brand : "All Home Kitchens"}</h3>
        <p>{selectedGirl ? `${selectedGirl.address} | ${selectedGirl.mobile}` : "Fresh • Hygienic • Made with Love"}</p>
        <p className="copy">© 2026 Homemade Food. All rights reserved.</p>
      </footer>

      {/* CART NOTIFICATION */}
      {showPopup && <div className="cart-popup">{popupText}</div>}
    </div>
  );
};

export default HomemadeFood;