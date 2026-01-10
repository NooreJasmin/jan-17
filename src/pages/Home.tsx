import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ padding: 20, textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Crave Wave 🍽️</h1>
      <p>Explore Home-made and Restaurant food.</p>

      <div style={{ marginTop: 20 }}>
        <Link to="/home-food">
          <button style={{ padding: "10px 20px", margin: 10, backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>
            Home Food
          </button>
        </Link>

        <Link to="/restaurant-food">
          <button style={{ padding: "10px 20px", margin: 10, backgroundColor: "darkcyan", color: "white", border: "none", borderRadius: 5, cursor: "pointer" }}>
            Restaurant Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;