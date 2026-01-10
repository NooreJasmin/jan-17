import React, { useState } from "react";

interface Food {
  name: string;
  category: "Meals" | "snacks" | "desserts";
  price: number;
  calories: number;
  protein: string;
  image: string;
}

const homeFoodData: Food[] = [
  {
    name: "Homemade Dosa",
    category: "Meals",
    price: 80,
    calories: 200,
    protein: "6g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuzc44qLu6vZgLQUlqw1suSO_ACf-mxOifQ&s",
  },
  {
    name: "Veg Sandwich",
    category: "snacks",
    price: 50,
    calories: 150,
    protein: "5g",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/veg-grilled-sandwich-recipe.jpg",
  },
  {
    name: "Gulab Jamun",
    category: "desserts",
    price: 60,
    calories: 250,
    protein: "4g",
    image: "https://www.cookclickndevour.com/wp-content/uploads/2017/08/gulab-jamun-recipe-b.jpg",
  },
];

const HomeFood: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(homeFoodData);

  const filterFood = (category: "all" | Food["category"]) => {
    if (category === "all") {
      setFoods(homeFoodData);
    } else {
      setFoods(homeFoodData.filter((f) => f.category === category));
    }
  };

  const addToCart = (name: string) => alert(`${name} added to cart!`);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "darkcyan", color: "white", padding: 15, textAlign: "center" }}>
        <h1>🏠 Home-made Food</h1>
      </header>

      <div style={{ textAlign: "center", margin: 15 }}>
        {["all", "snacks", "Meals", "desserts"].map((cat) => (
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
        {foods.map((food) => (
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
    </div>
  );
};

export default HomeFood;