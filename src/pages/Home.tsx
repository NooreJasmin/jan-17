import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Category = "all" | "snacks" | "meals" | "desserts";
type Source = "all" | "homemade" | "restaurant";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  type: Category;
  img: string;
  source: Source;
  calories?: number;
  protein?: string;
}

// All Homemade Food
const homemadeFood: FoodItem[] = [
  { id: 1, name: "Veg Meals", price: 100, type: "meals", img: "/image/vegmeals.png", source: "homemade" },
  { id: 2, name: "Samosa", price: 40, type: "snacks", img: "/image/samosa.png", source: "homemade" },
  { id: 3, name: "Laddu", price: 60, type: "desserts", img: "/image/laddu.png", source: "homemade" },
  { id: 4, name: "Curd Rice", price: 80, type: "meals", img: "/image/curdrice.png", source: "homemade" },
  { id: 5, name: "Egg Fried Rice", price: 90, type: "meals", img: "/image/eggfriedrice.png", source: "homemade" },
  { id: 6, name: "Paneer Butter Masala", price: 150, type: "meals", img: "/image/paneer.png", source: "homemade" },
  { id: 7, name: "Chicken Biryani", price: 200, type: "meals", img: "/image/chickenbri.png", source: "homemade" },
  { id: 8, name: "Chapati with Kurma", price: 120, type: "meals", img: "/image/chapati.png", source: "homemade" },
  { id: 9, name: "Egg Curry", price: 130, type: "meals", img: "/image/eggcurry.png", source: "homemade" },
  { id: 10, name: "Masala Dosa", price: 70, type: "meals", img: "/image/masaldosa.png", source: "homemade" },
  { id: 11, name: "Chocolate Cake", price: 60, type: "desserts", img: "/image/chococake.jpg", source: "homemade" },
  { id: 12, name: "Pani Puri", price: 30, type: "snacks", img: "/image/pani.png", source: "homemade" },
  { id: 13, name: "Murukku", price: 30, type: "snacks", img: "/image/muruku.png", source: "homemade" },
  { id: 14, name: "Coconut Milk Payasam", price: 40, type: "desserts", img: "/image/comilkpaya.png", source: "homemade" },
  { id: 15, name: "Veg Sandwich", price: 50, type: "snacks", img: "/image/vegsan.png", source: "homemade" },
  { id: 16, name: "Carrot Halwa", price: 60, type: "desserts", img: "/image/carrathalwa.png", source: "homemade" },
  { id: 17, name: "Veg Roll", price: 60, type: "snacks", img: "/image/vegroll.png", source: "homemade" },
  { id: 18, name: "Idly with Sambar", price: 90, type: "meals", img: "/image/idly.png", source: "homemade" },
  { id: 19, name: "Ragi Halwa", price: 120, type: "desserts", img: "/image/ragihalwa.png", source: "homemade" },
  { id: 20, name: "Dates & Nuts Ladoo", price: 80, type: "desserts", img: "/image/nutsladoo.png", source: "homemade" },
  { id: 21, name: "Fish Fry", price: 50, type: "meals", img: "/image/fishfry.png", source: "homemade" },
  { id: 22, name: "Kozhukattai", price: 60, type: "desserts", img: "/image/kolu.png", source: "homemade" },
  { id: 23, name: "Brownie", price: 100, type: "desserts", img: "/image/brownie.png", source: "homemade" },
  { id: 24, name: "Cupcake", price: 70, type: "desserts", img: "/image/cupcake.jpg", source: "homemade" },
  { id: 25, name: "Egg Puffs", price: 50, type: "snacks", img: "/image/egg puff.png", source: "homemade" },
  { id: 26, name: "Vegetable Soup", price: 90, type: "snacks", img: "/image/veg soup.png", source: "homemade" },
  { id: 27, name: "Aval Payasam", price: 90, type: "desserts", img: "/image/aval pysm.png", source: "homemade" },
];

// All Restaurant Food
const restaurantFood: FoodItem[] = [
  { id: 101, name: "Chicken Biryani", price: 220, type: "meals", img: "https://t4.ftcdn.net/jpg/12/36/95/09/360_F_1236950902_WdmHKltisVpaQ3aJnfN5ag0IcAuKDNqs.jpg", source: "restaurant", calories: 450, protein: "28g" },
  { id: 102, name: "Veg Fried Rice", price: 150, type: "meals", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDttBX4uGzZ1Y5POXeUaPMkVCYtayAsijVw&s", source: "restaurant", calories: 300, protein: "10g" },
  { id: 103, name: "French Fries", price: 120, type: "snacks", img: "https://t4.ftcdn.net/jpg/15/03/85/47/360_F_1503854710_IAH8Py9CJomWgkcuiwUF1ZXpyueqAgqu.jpg", source: "restaurant", calories: 320, protein: "4g" },
  { id: 104, name: "Chocolate Cake", price: 160, type: "desserts", img: "https://magicbakers.in/wp-content/uploads/2024/03/ChocolateTruffleCake.jpg", source: "restaurant", calories: 420, protein: "6g" },
  { id: 105, name: "Veg Thali", price: 200, type: "meals", img: "https://t3.ftcdn.net/jpg/09/27/96/12/360_F_927961271_wGEmNb81rO3hYpXMfAlK8LFNt0TKekDt.jpg", source: "restaurant", calories: 500, protein: "18g" },
  { id: 106, name: "Paneer Butter Masala", price: 190, type: "meals", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GMD_WH9sl6HjJ4CObB9Lim-51zBji9n5KA&s", source: "restaurant", calories: 410, protein: "20g" },
  { id: 107, name: "Mutton Biryani", price: 280, type: "meals", img: "https://www.shutterstock.com/image-photo/hyderabadi-chicken-biryani-aromatic-flavorful-260nw-2497040151.jpg", source: "restaurant", calories: 520, protein: "32g" },
  { id: 108, name: "Veg Puff", price: 35, type: "snacks", img: "https://floursandfrostings.com/wp-content/uploads/2018/03/IMG_20180306_084523_451.jpg", source: "restaurant", calories: 160, protein: "4g" },
  { id: 109, name: "Chicken Nuggets", price: 180, type: "snacks", img: "https://media.istockphoto.com/id/537703317/photo/chicken-nuggets-with-ketchup.jpg?s=612x612&w=0&k=20&c=ywQQ8RIeD2oRbyQrG6JQBLbo1laVEzXKU1ecbgjgXJo=", source: "restaurant", calories: 290, protein: "15g" },
  { id: 110, name: "Spring Rolls", price: 140, type: "snacks", img: "https://www.thecookingcollective.com.au/wp-content/uploads/2022/08/Vegetable-Spring-Rolls-2-1-500x500.jpg", source: "restaurant", calories: 260, protein: "6g" },
  { id: 111, name: "Ice Cream", price: 100, type: "desserts", img: "https://media.istockphoto.com/id/936205852/photo/chocolate-ice-cream-in-a-glass-cup.jpg?s=612x612&w=0&k=20&c=gcPTroDVPNSlCS45BkqEG-6-REnKFEzboBpuX8O3lY4=", source: "restaurant", calories: 250, protein: "5g" },
  { id: 112, name: "Gulab Jamun", price: 90, type: "desserts", img: "https://bolnews.s3.amazonaws.com/wp-content/uploads/2020/12/2-12.jpg", source: "restaurant", calories: 300, protein: "4g" },
  { id: 113, name: "Brownie", price: 140, type: "desserts", img: "https://png.pngtree.com/thumb_back/fh260/background/20240731/pngtree-d-dark-chocolate-brownie-slice-homemade-indulgence-temptation-generated-by-ai-image_16120597.jpg", source: "restaurant", calories: 410, protein: "6g" },
  { id: 114, name: "Fruit Salad", price: 120, type: "desserts", img: "https://rumkisgoldenspoon.com/wp-content/uploads/2024/06/Fruit-salad-recipe.jpg", source: "restaurant", calories: 180, protein: "3g" },
];

const Home: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>([...homemadeFood, ...restaurantFood]);
  const [activeSource, setActiveSource] = useState<Source>("all");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const navigate = useNavigate();

  const checkLogin = async (): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("⚠️ Please login first!");
      navigate("/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = async (item: FoodItem) => {
    const loggedIn = await checkLogin();
    if (!loggedIn) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart 🛒`);
    navigate("/cart");
  };

  useEffect(() => {
    let filtered = [...homemadeFood, ...restaurantFood];
    if (activeSource !== "all") filtered = filtered.filter(f => f.source === activeSource);
    if (activeCategory !== "all") filtered = filtered.filter(f => f.type === activeCategory);
    setFoods(filtered);
  }, [activeSource, activeCategory]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Crave Wave 🍽️</h1>

      {/* Source Buttons */}
      <div style={{ textAlign: "center", margin: 15 }}>
        <button onClick={() => setActiveSource("all")} style={buttonStyle(activeSource === "all")}>All Food</button>
        <button onClick={() => setActiveSource("homemade")} style={buttonStyle(activeSource === "homemade")}>Home Food</button>
        <button onClick={() => setActiveSource("restaurant")} style={buttonStyle(activeSource === "restaurant")}>Restaurant Food</button>
      </div>

      {/* Category Buttons */}
      <div style={{ textAlign: "center", margin: 15 }}>
        {(["all", "snacks", "meals", "desserts"] as Category[]).map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={buttonStyle(activeCategory === cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, padding: 20 }}>
        {foods.map(food => (
          <div key={food.id} style={{
            background: "white",
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            padding: 15,
            textAlign: "center"
          }}>
            <img src={food.img} alt={food.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }} />
            <h3>{food.name}</h3>
            <p style={{ color: "green", fontWeight: "bold" }}>₹{food.price}</p>
            {food.calories && <p>Calories: {food.calories} kcal</p>}
            {food.protein && <p>Protein: {food.protein}</p>}
            <button onClick={() => handleAddToCart(food)} style={{
              backgroundColor: "darkcyan",
              color: "white",
              border: "none",
              padding: 10,
              borderRadius: 5,
              cursor: "pointer"
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const buttonStyle = (active: boolean) => ({
  padding: "10px 20px",
  margin: 5,
  backgroundColor: active ? "darkcyan" : "#023d48",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer"
});

export default Home;