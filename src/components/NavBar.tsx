import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "darkcyan", textAlign: "center" }}>
      <Link to="/" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>Home</Link>
      <Link to="/home-food" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>Home Food</Link>
      <Link to="/restaurant-food" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>Restaurant Food</Link>
      <Link to="/cart" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>Cart</Link>
      <Link to="/login" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>Login</Link>
      <Link to="/signup" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>Sign Up</Link>
    </nav>
  );
};

export default Navbar;