// Home.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Category = "all" | "meals" | "snacks" | "desserts";
type Source = "all" | "homemade" | "restaurant";

interface FoodItem {
  id?: number;
  name: string;
  price: number;
  category: Category | "Meals";
  img: string;
  calories?: number;
  protein?: string;
  source: Source;
}

/* ================= HOMEMADE FOOD (UNCHANGED) ================= */

const homemadeFoods: FoodItem[] = [
  { id: 1, name: "Veg Meals", price: 100, category: "meals", img: "/image/vegmeals.png", source: "homemade" },
  { id: 2, name: "Samosa", price: 40, category: "snacks", img: "/image/samosa.png", source: "homemade" },
  { id: 3, name: "Egg Fried Rice", price: 90, category: "meals", img: "/image/eggfriedrice.png", source: "homemade" },
  { id: 4, name: "Paneer Butter Masala", price: 150, category: "meals", img: "/image/paneer.png", source: "homemade" },
  { id: 5, name: "Chocolate Cake", price: 60, category: "desserts", img: "/image/chococake.jpg", source: "homemade" },
  { id: 6, name: "Murukku", price: 30, category: "snacks", img: "/image/muruku.png", source: "homemade" },
  { id: 7, name: "Carrot Halwa", price: 60, category: "desserts", img: "/image/carrathalwa.png", source: "homemade" },
  { id: 8, name: "Idly with Sambar", price: 90, category: "meals", img: "/image/idly.png", source: "homemade" },
  { id: 9, name: "Brownie", price: 100, category: "snacks", img: "/image/brownie.png", source: "homemade" },
  { id: 10, name: "Vegetable Soup", price: 90, category: "snacks", img: "/image/vegsoup.png", source: "homemade" },
  { id: 11, name: "Pani Puri", price: 30, category: "snacks", img: "/image/pani.png", source: "homemade" },
  { id: 12, name: "Aval Payasam", price: 90, category: "desserts", img: "/image/avalpayasam.png", source: "homemade" },
  { id: 13, name: "Chicken Biryani", price: 200, category: "meals", img: "/image/chickenbri.png", source: "homemade" },
  { id: 14, name: "Mutton Biriyani", price: 350, category: "meals", img: "/image/muttonbiryani.png", source: "homemade" },
  { id: 15, name: "Bread Halwa", price: 90, category: "desserts", img: "/image/breadhalwa.png", source: "homemade" },
  { id: 16, name: "Chicken Soup", price: 190, category: "meals", img: "/image/chickensoup.png", source: "homemade" },
  { id: 17, name: "Fish Fry", price: 160, category: "meals", img: "/image/fishfry.png", source: "homemade" },
  { id: 18, name: "Meen Kuzhambu", price: 70, category: "meals", img: "/image/MeenKuzhambu.png", source: "homemade" },
  { id: 19, name: "White Rice with Meen Kuzhambu", price: 160, category: "meals", img: "/image/WhiteRice_MeenKuzhambu.png", source: "homemade" },
];

/* ================= RESTAURANT FOOD (FROM YOUR FILE) ================= */

const restaurantFoods: FoodItem[] = [
  { name: "Chicken Biryani", category: "Meals", price: 220, calories: 450, protein: "28g", img: "https://t4.ftcdn.net/jpg/12/36/95/09/360_F_1236950902_WdmHKltisVpaQ3aJnfN5ag0IcAuKDNqs.jpg", source: "restaurant" },
  { name: "Veg Fried Rice", category: "Meals", price: 150, calories: 300, protein: "10g", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDttBX4uGzZ1Y5POXeUaPMkVCYtayAsijVw&s", source: "restaurant" },
  { name: "Samosa", category: "snacks", price: 40, calories: 180, protein: "5g", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrcYztQ4EuqcTWGyoftvdT_Eo-vLkMfBbiw&s", source: "restaurant" },
  { name: "French Fries", category: "snacks", price: 120, calories: 320, protein: "4g", img: "https://t4.ftcdn.net/jpg/15/03/85/47/360_F_1503854710_IAH8Py9CJomWgkcuiwUF1ZXpyueqAgqu.jpg", source: "restaurant" },
  { name: "Chocolate Cake", category: "desserts", price: 160, calories: 420, protein: "6g", img: "https://magicbakers.in/wp-content/uploads/2024/03/ChocolateTruffleCake.jpg", source: "restaurant" },
  { name: "Veg Thali", category: "Meals", price: 200, calories: 500, protein: "18g", img: "https://t3.ftcdn.net/jpg/09/27/96/12/360_F_927961271_wGEmNb81rO3hYpXMfAlK8LFNt0TKekDt.jpg", source: "restaurant" },
  { name: "Paneer Butter Masala", category: "Meals", price: 190, calories: 410, protein: "20g", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GMD_WH9sl6HjJ4CObB9Lim-51zBji9n5KA&s", source: "restaurant" },
  { name: "Mutton Biryani", category: "Meals", price: 280, calories: 520, protein: "32g", img: "https://www.shutterstock.com/image-photo/hyderabadi-chicken-biryani-aromatic-flavorful-260nw-2497040151.jpg", source: "restaurant" },
  { name: "Veg Puff", category: "snacks", price: 35, calories: 160, protein: "4g", img: "https://floursandfrostings.com/wp-content/uploads/2018/03/IMG_20180306_084523_451.jpg", source: "restaurant" },
  { name: "Chicken Nuggets", category: "snacks", price: 180, calories: 290, protein: "15g", img: "https://media.istockphoto.com/id/537703317/photo/chicken-nuggets-with-ketchup.jpg?s=612x612&w=0&k=20&c=ywQQ8RIeD2oRbyQrG6JQBLbo1laVEzXKU1ecbgjgXJo=", source: "restaurant" },
  { name: "Spring Rolls", category: "snacks", price: 140, calories: 260, protein: "6g", img: "https://www.thecookingcollective.com.au/wp-content/uploads/2022/08/Vegetable-Spring-Rolls-2-1-500x500.jpg", source: "restaurant" },
  { name: "Ice Cream", category: "desserts", price: 100, calories: 250, protein: "5g", img: "https://media.istockphoto.com/id/936205852/photo/chocolate-ice-cream-in-a-glass-cup.jpg?s=612x612&w=0&k=20&c=gcPTroDVPNSlCS45BkqEG-6-REnKFEzboBpuX8O3lY4=", source: "restaurant" },
  { name: "Gulab Jamun", category: "desserts", price: 90, calories: 300, protein: "4g", img: "https://bolnews.s3.amazonaws.com/wp-content/uploads/2020/12/2-12.jpg", source: "restaurant" },
  { name: "Brownie", category: "desserts", price: 140, calories: 410, protein: "6g", img: "https://png.pngtree.com/thumb_back/fh260/background/20240731/pngtree-d-dark-chocolate-brownie-slice-homemade-indulgence-temptation-generated-by-ai-image_16120597.jpg", source: "restaurant" },
  { name: "Fruit Salad", category: "desserts", price: 120, calories: 180, protein: "3g", img: "https://rumkisgoldenspoon.com/wp-content/uploads/2024/06/Fruit-salad-recipe.jpg", source: "restaurant" },
];

/* ================= COMPONENT ================= */

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeSource, setActiveSource] = useState<Source>("all");

  const allFoods = [...homemadeFoods, ...restaurantFoods];

  const filteredFoods = allFoods.filter(food => {
    const text = `${food.name} ${food.category} ${food.source} ${food.calories ?? ""} ${food.protein ?? ""}`.toLowerCase();

    const searchMatch = text.includes(search.toLowerCase());
    const categoryMatch = activeCategory === "all" || food.category.toLowerCase() === activeCategory;
    const sourceMatch = activeSource === "all" || food.source === activeSource;

    return searchMatch && categoryMatch && sourceMatch;
  });

  const handleAddToCart = (item: FoodItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Crave Wave 🍽️</h1>

      {/* SEARCH */}
      <input
        placeholder="Search food, category, calories, protein..."
        value={search}
        onChange={e => setSearch(e.target.value)}
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
        {(["all", "homemade", "restaurant"] as Source[]).map(src => (
          <button key={src} onClick={() => setActiveSource(src)} style={btn(activeSource === src)}>
            {src}
          </button>
        ))}
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {(["all", "meals", "snacks", "desserts"] as Category[]).map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={btn(activeCategory === cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
        {filteredFoods.map((food, i) => (
          <div key={i} style={{ background: "#fff", padding: 15, borderRadius: 10 }}>
            <img src={food.img} style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <h3>{food.name}</h3>
            <p style={{ color: "green" }}>₹{food.price}</p>
            {food.calories && <p>Calories: {food.calories}</p>}
            {food.protein && <p>Protein: {food.protein}</p>}
            <button onClick={() => handleAddToCart(food)} style={{ width: "100%", padding: 10, background: "darkcyan", color: "#fff", border: "none" }}>
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