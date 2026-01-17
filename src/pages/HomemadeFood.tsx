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

/* 👩‍🍳 GIRL DETAILS */
const girls: Girl[] = [
  { id: 1, img: "/image/chef1.png", name: "Anitha", brand: "Anitha Home Foods", address: "Chennai", mobile: "📞 9876543210" },
  { id: 2, img: "/image/chef2.png", name: "Priya", brand: "Priya Kitchen", address: "Coimbatore", mobile: "📞 9123456780" },
  { id: 3, img: "/image/chef3.png", name: "Lakshmi", brand: "Lakshmi Homemade", address: "Madurai", mobile: "📞 9988776655" },
  { id: 4, img: "/image/chef4.png", name: "Meena", brand: "Meena Traditional Foods", address: "Coimbatore", mobile: "📞 8877665544" },
  { id: 5, img: "/image/chef5.png", name: "Arun", brand: "Arun Home Foods", address: "Salem", mobile: "📞 8899001122" },
  { id: 6, img: "/image/chef6.png", name: "Fathima", brand: "Bismillah Hotel", address: "Pallavaram", mobile: "📞 8897001122" },
  { id: 7, img: "/image/chef7.png", name: "Sathish", brand: "Sathish Kai Vannam", address: "Pozhichalur", mobile: "📞 7336001122" },
];

/* 🍱 FOOD ITEMS (UNCHANGED) */
const foods: FoodItem[] = [
  { id: 1, girlId: 1, name: "Veg Meals", price: 100, category: "meals", img: "/image/vegmeals.png" },
  { id: 2, girlId: 1, name: "Samosa", price: 40, category: "snacks", img: "/image/samosa.png" },
  { id: 3, girlId: 1, name: "Egg Fried Rice", price: 90, category: "meals", img: "/image/eggfriedrice.png" },
  { id: 4, girlId: 1, name: "Paneer Butter Masala", price: 150, category: "meals", img: "/image/paneer.png" },
  { id: 6, girlId: 2, name: "Chocolate Cake", price: 60, category: "desserts", img: "/image/chococake.jpg" },
  { id: 8, girlId: 2, name: "Murukku", price: 30, category: "snacks", img: "/image/muruku.png" },
  { id: 9, girlId: 2, name: "Carrot Halwa", price: 60, category: "desserts", img: "/image/carrathalwa.png" },
  { id: 10, girlId: 3, name: "Idly with Sambar", price: 90, category: "meals", img: "/image/idly.png" },
  { id: 11, girlId: 3, name: "Brownie", price: 100, category: "snacks", img: "/image/brownie.png" },
  { id: 12, girlId: 4, name: "Vegetable Soup", price: 90, category: "snacks", img: "/image/vegsoup.png" },
  { id: 7, girlId: 4, name: "Pani Puri", price: 30, category: "snacks", img: "/image/pani.png" },
  { id: 13, girlId: 5, name: "Aval Payasam", price: 90, category: "desserts", img: "/image/avalpayasam.png" },
  { id: 5, girlId: 5, name: "Chicken Biryani", price: 200, category: "meals", img: "/image/chickenbri.png" },
  { id: 14, girlId: 6, name: "Mutton Biriyani", price: 350, category: "meals", img: "/image/muttonbiryani.png" },
  { id: 15, girlId: 6, name: "Bread Halwa", price: 90, category: "desserts", img: "/image/breadhalwa.png" },
  { id: 16, girlId: 6, name: "Chicken Soup", price: 190, category: "meals", img: "/image/chickensoup.png" },
  { id: 17, girlId: 7, name: "Fish Fry", price: 160, category: "meals", img: "/image/fishfry.png" },
  { id: 18, girlId: 7, name: "Meen Kuzhambu", price: 70, category: "meals", img: "/image/MeenKuzhambu.png" },
  { id: 19, girlId: 7, name: "White Rice with Meen Kuzhambu", price: 160, category: "meals", img: "/image/WhiteRice_MeenKuzhambu.png" },
];

const HomemadeFood: React.FC = () => {
  const [selectedGirl, setSelectedGirl] = useState<Girl | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filteredFood = foods.filter((food) => {
    const girl = girls.find(g => g.id === food.girlId);

    const searchTarget = `
      ${food.name}
      ${food.category}
      ${girl?.name}
      ${girl?.brand}
      ${girl?.address}
    `.toLowerCase();

    if (search && !searchTarget.includes(search.toLowerCase())) return false;
    if (selectedGirl && food.girlId !== selectedGirl.id) return false;
    if (category !== "all" && food.category !== category) return false;

    return true;
  });

  return (
    <>
      <header>
        <h1 className="page-title">Homemade Food</h1>
        <p>Fresh • Hygienic • Made with Love</p>
      </header>

      {/* 🔍 SEARCH */}
      <div style={{ textAlign: "center", margin: 15 }}>
        <input
          placeholder="Search food, chef, brand, place..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 10, width: "90%", maxWidth: 420 }}
        />
      </div>

      {/* CATEGORY */}
      <div className="category">
        {["all", "snacks", "meals", "desserts"].map((cat) => (
          <span key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat as Category)}>
            {cat.toUpperCase()}
          </span>
        ))}
      </div>

      {/* FOOD */}
      <div className="food-container">
        {filteredFood.map(food => (
          <div className="food-card" key={food.id}>
            <img src={food.img} alt={food.name} />
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomemadeFood;