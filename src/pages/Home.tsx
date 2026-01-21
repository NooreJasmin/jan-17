// Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Category = "all" | "meals" | "snacks" | "desserts";
type Source = "all" | "homemade" | "restaurant";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  img: string;
  calories?: number;
  protein?: string;
  source: Source;
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeSource, setActiveSource] = useState<Source>("all");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH FROM SUPABASE ================= */

  useEffect(() => {
    const fetchFoods = async () => {
      const { data, error } = await supabase.from("foods").select("*");

      if (error) {
        console.error("Supabase error:", error);
        setLoading(false);
        return;
      }

      const mappedFoods: FoodItem[] =
        data?.map((food: any) => ({
          id: food.id,
          name: food.name,
          price: Number(food.price),
          category: food.category.toLowerCase(),
          calories: food.calories,
          protein: food.protein,
          source: food.type,
          img:
            food.type === "homemade"
              ? `/image/${food.image_url}`
              : food.image_url,
        })) || [];

      setFoods(mappedFoods);
      setLoading(false);
    };

    fetchFoods();
  }, []);

  /* ================= FILTER LOGIC (UNCHANGED) ================= */

  const filteredFoods = foods.filter((food) => {
    const text = `${food.name} ${food.category} ${food.source} ${
      food.calories ?? ""
    } ${food.protein ?? ""}`.toLowerCase();

    const searchMatch = text.includes(search.toLowerCase());
    const categoryMatch =
      activeCategory === "all" || food.category === activeCategory;
    const sourceMatch =
      activeSource === "all" || food.source === activeSource;

    return searchMatch && categoryMatch && sourceMatch;
  });

  /* ================= CART ================= */

  const handleAddToCart = (item: FoodItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  /* ================= UI ================= */

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading foods...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Crave Wave 🍽️</h1>

      {/* SEARCH */}
      <input
        placeholder="Search food, category, calories, protein..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          margin: "15px 0",
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      {/* SOURCE FILTER */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        {(["all", "homemade", "restaurant"] as Source[]).map((src) => (
          <button
            key={src}
            onClick={() => setActiveSource(src)}
            style={btn(activeSource === src)}
          >
            {src}
          </button>
        ))}
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {(["all", "meals", "snacks", "desserts"] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={btn(activeCategory === cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            style={{ background: "#fff", padding: 15, borderRadius: 10 }}
          >
            <img
              src={food.img}
              alt={food.name}
              style={{ width: "100%", height: 160, objectFit: "cover" }}
            />
            <h3>{food.name}</h3>
            <p style={{ color: "green" }}>₹{food.price}</p>
            {food.calories && <p>Calories: {food.calories}</p>}
            {food.protein && <p>Protein: {food.protein}</p>}
            <button
              onClick={() => handleAddToCart(food)}
              style={{
                width: "100%",
                padding: 10,
                background: "darkcyan",
                color: "#fff",
                border: "none",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const btn = (active: boolean) => ({
  margin: 5,
  padding: "8px 15px",
  background: active ? "darkcyan" : "#023d48",
  color: "white",
  border: "none",
  borderRadius: 6,
});

export default Home;