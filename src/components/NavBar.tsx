import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/CraveWave.png";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: "darkcyan",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid white",
          }}
        />
        <h2 style={{ color: "white", margin: 0 }}>Crave Wave</h2>
      </div>

      {/* Center: Links */}
      <nav>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/home-food" style={linkStyle}>Home Food</Link>
        <Link to="/restaurant-food" style={linkStyle}>Restaurant Food</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
      </nav>

      {/* Right: Buttons */}
      <div>
        <button onClick={() => navigate("/login")} style={btnStyle}>
          Log in
        </button>
        <button
          onClick={() => navigate("/signup")}
          style={{ ...btnStyle, backgroundColor: "white", color: "darkcyan" }}
        >
          Sign up
        </button>
      </div>
    </header>
  );
};

/* ---------- styles ---------- */
const linkStyle = {
  color: "white",
  margin: "0 12px",
  textDecoration: "none",
  fontWeight: "500",
};

const btnStyle = {
  marginLeft: "10px",
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  backgroundColor: "transparent",
  color: "white",
  borderColor: "white",
  borderWidth: "1px",
  borderStyle: "solid",
};

export default NavBar;