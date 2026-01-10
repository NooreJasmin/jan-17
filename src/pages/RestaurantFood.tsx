import React, { useState } from "react";

interface Food {
  name: string;
  category: "Meals" | "snacks" | "desserts";
  price: number;
  calories: number;
  protein: string;
  image: string;
}

const restaurantFoodData: Food[] = [
  { name: "Chicken Biryani", category: "Meals", price: 220, calories: 450, protein: "28g", image: "https://t4.ftcdn.net/jpg/12/36/95/09/360_F_1236950902_WdmHKltisVpaQ3aJnfN5ag0IcAuKDNqs.jpg" },
  { name: "Veg Fried Rice", category: "Meals", price: 150, calories: 300, protein: "10g", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDttBX4uGzZ1Y5POXeUaPMkVCYtayAsijVw&s" },
  { name: "Samosa", category: "snacks", price: 40, calories: 180, protein: "5g", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrcYztQ4EuqcTWGyoftvdT_Eo-vLkMfBbiw&s" },
  { name: "French Fries", category: "snacks", price: 120, calories: 320, protein: "4g", image: "https://t4.ftcdn.net/jpg/15/03/85/47/360_F_1503854710_IAH8Py9CJomWgkcuiwUF1ZXpyueqAgqu.jpg" },
  { name: "Chocolate Cake", category: "desserts", price: 160, calories: 420, protein: "6g", image: "https://magicbakers.in/wp-content/uploads/2024/03/ChocolateTruffleCake.jpg" },
];

const RestaurantFood: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(restaurantFoodData);
  const [toast, setToast] = useState<string | null>(null);

  const filterFood = (category: "all" | Food["category"]) => {
    setFoods(category === "all" ? restaurantFoodData : restaurantFoodData.filter(f => f.category === category));
  };

  const addToCart = (name: string) => {
    setToast(`${name} added to cart!`);
    setTimeout(() => setToast(null), 5000); // Hide after 5 seconds
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh", position: "relative" }}>
      <header style={{ backgroundColor: "darkcyan", color: "white", padding: 15, textAlign: "center" }}>
        <h1>🏢 Restaurant Food</h1>
      </header>

      <div style={{ textAlign: "center", margin: 15 }}>
        {["all", "snacks", "Meals", "desserts"].map(cat => (
          <button
            key={cat}
            onClick={() => filterFood(cat as "all" | Food["category"])}
            style={{
              backgroundColor: "#023d48",
              color: "white",
              border: "none",
              padding: "8px 15px",
              margin: 5,
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, padding: 20 }}>
        {foods.map(food => (
          <div key={food.name} style={{ background: "black", borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.2)", padding: 15, textAlign: "center" }}>
            <img src={food.image} alt={food.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }} />
            <h3>{food.name}</h3>
            <p style={{ color: "green", fontWeight: "bold" }}>₹{food.price}</p>
            <div style={{ fontSize: 14, margin: "8px 0" }}>
              <p>Calories: {food.calories} kcal</p>
              <p>Protein: {food.protein}</p>
            </div>
            <button onClick={() => addToCart(food.name)} style={{ backgroundColor: "darkcyan", color: "white", border: "none", padding: 10, borderRadius: 5, cursor: "pointer" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {toast && (
        <div style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "darkcyan",
          color: "white",
          padding: "10px 20px",
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 1000,
          fontWeight: "bold",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default RestaurantFood;