import React, { useState } from "react";

// Food interface
interface Food {
  name: string;
  category: "Meals" | "snacks" | "desserts";
  price: number;
  calories: number;
  protein: string;
  image: string;
}

const foodData: Food[] = [
  {
    name: "Chicken Biryani",
    category: "Meals",
    price: 220,
    calories: 450,
    protein: "28g",
    image: "https://t4.ftcdn.net/jpg/12/36/95/09/360_F_1236950902_WdmHKltisVpaQ3aJnfN5ag0IcAuKDNqs.jpg"
  },
  {
    name: "Veg Fried Rice",
    category: "Meals",
    price: 150,
    calories: 300,
    protein: "10g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDttBX4uGzZ1Y5POXeUaPMkVCYtayAsijVw&s"
  },
  {
    name: "Samosa",
    category: "snacks",
    price: 40,
    calories: 180,
    protein: "5g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvrcYztQ4EuqcTWGyoftvdT_Eo-vLkMfBbiw&s"
  },
  {
    name: "French Fries",
    category: "snacks",
    price: 120,
    calories: 320,
    protein: "4g",
    image: "https://t4.ftcdn.net/jpg/15/03/85/47/360_F_1503854710_IAH8Py9CJomWgkcuiwUF1ZXpyueqAgqu.jpg"
  },
  {
    name: "Chocolate Cake",
    category: "desserts",
    price: 160,
    calories: 420,
    protein: "6g",
    image: "https://magicbakers.in/wp-content/uploads/2024/03/ChocolateTruffleCake.jpg"
  },
  {
    name: "Veg Thali",
    category: "Meals",
    price: 200,
    calories: 500,
    protein: "18g",
    image: "https://t3.ftcdn.net/jpg/09/27/96/12/360_F_927961271_wGEmNb81rO3hYpXMfAlK8LFNt0TKekDt.jpg"
  },
  {
    name: "Paneer Butter Masala",
    category: "Meals",
    price: 190,
    calories: 410,
    protein: "20g",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6GMD_WH9sl6HjJ4CObB9Lim-51zBji9n5KA&s"
  },
  {
    name: "Mutton Biryani",
    category: "Meals",
    price: 280,
    calories: 520,
    protein: "32g",
    image: "https://www.shutterstock.com/image-photo/hyderabadi-chicken-biryani-aromatic-flavorful-260nw-2497040151.jpg"
  },
  {
    name: "Veg Puff",
    category: "snacks",
    price: 35,
    calories: 160,
    protein: "4g",
    image: "https://floursandfrostings.com/wp-content/uploads/2018/03/IMG_20180306_084523_451.jpg"
  },
  {
    name: "Chicken Nuggets",
    category: "snacks",
    price: 180,
    calories: 290,
    protein: "15g",
    image: "https://media.istockphoto.com/id/537703317/photo/chicken-nuggets-with-ketchup.jpg?s=612x612&w=0&k=20&c=ywQQ8RIeD2oRbyQrG6JQBLbo1laVEzXKU1ecbgjgXJo="
  },
  {
    name: "Spring Rolls",
    category: "snacks",
    price: 140,
    calories: 260,
    protein: "6g",
    image: "https://www.thecookingcollective.com.au/wp-content/uploads/2022/08/Vegetable-Spring-Rolls-2-1-500x500.jpg"
  },
  {
    name: "Ice Cream",
    category: "desserts",
    price: 100,
    calories: 250,
    protein: "5g",
    image: "https://media.istockphoto.com/id/936205852/photo/chocolate-ice-cream-in-a-glass-cup.jpg?s=612x612&w=0&k=20&c=gcPTroDVPNSlCS45BkqEG-6-REnKFEzboBpuX8O3lY4="
  },
  {
    name: "Gulab Jamun",
    category: "desserts",
    price: 90,
    calories: 300,
    protein: "4g",
    image: "https://bolnews.s3.amazonaws.com/wp-content/uploads/2020/12/2-12.jpg"
  },
  {
    name: "Brownie",
    category: "desserts",
    price: 140,
    calories: 410,
    protein: "6g",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20240731/pngtree-d-dark-chocolate-brownie-slice-homemade-indulgence-temptation-generated-by-ai-image_16120597.jpg"
  },
  {
    name: "Fruit Salad",
    category: "desserts",
    price: 120,
    calories: 180,
    protein: "3g",
    image: "https://rumkisgoldenspoon.com/wp-content/uploads/2024/06/Fruit-salad-recipe.jpg"
  }
];

const RestaurantFood: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(foodData);
  const [searchText, setSearchText] = useState("");

  const filterFood = (category: "all" | Food["category"]) => {
    if (category === "all") setFoods(foodData);
    else setFoods(foodData.filter(food => food.category === category));
  };

  const addToCart = (name: string) => {
    alert(`${name} added to cart!`);
  };

  const visibleFoods = foods.filter(food =>
    `${food.name} ${food.category} ${food.calories} ${food.protein}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin:0; padding:0; width:100%; height:100%; }
        body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
        header { width: 100%; background-color: darkcyan; color: white; padding: 18px; text-align: center; }
        .categories { width: 100%; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 15px 0; }
        .categories button { background-color: #023d48; color: white; border: none; padding: 8px 18px; border-radius: 20px; cursor: pointer; }
        .categories button:hover { background-color: darkcyan; }
        .container { width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; padding: 20px; }
        .card { background: white; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); padding: 15px; text-align: center; transition: transform 0.2s ease; }
        .card:hover { transform: translateY(-5px); }
        .card img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; }
        .price { color: green; font-weight: bold; }
        .nutrition { font-size: 14px; margin: 8px 0; }
        .card button { background-color: darkcyan; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; width: 100%; }
        .card button:hover { background-color: rgb(116, 243, 243); }
        .search-bar { width: 80%; max-width: 400px; padding: 8px 12px; border-radius: 8px; border: 1px solid #ccc; margin: 10px auto; display: block; }
      `}</style>

      <header>
        <h1>🍽️ Restaurant Food</h1>
      </header>

      <input
        className="search-bar"
        type="text"
        placeholder="Search food, category, calories..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="categories">
        <button onClick={() => filterFood("all")}>All</button>
        <button onClick={() => filterFood("snacks")}>Snacks</button>
        <button onClick={() => filterFood("Meals")}>Meals</button>
        <button onClick={() => filterFood("desserts")}>Desserts</button>
      </div>

      <div className="container">
        {visibleFoods.map(food => (
          <div className="card" key={food.name}>
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p className="price">₹{food.price}</p>
            <div className="nutrition">
              <p>Calories: {food.calories} kcal</p>
              <p>Protein: {food.protein}</p>
            </div>
            <button onClick={() => addToCart(food.name)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default RestaurantFood;