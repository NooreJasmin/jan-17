import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!mobile || !password) {
      alert("Please enter mobile number and password");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Lookup email by mobile number
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("mobile_number", mobile)
        .single();

      if (error || !data) {
        alert("Mobile number not found");
        setLoading(false);
        return;
      }

      const email = data.email;

      // 2️⃣ Login with Supabase auth
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        alert(loginError.message);
      } else {
        alert("Login successful 🎉");
        navigate("/"); // redirect to Home
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        minHeight: "80vh",
        background: "#f5f5f5",
      }}
    >
      <h2>🔐 Login</h2>

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{
          padding: 10,
          margin: 5,
          width: 250,
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: 10,
          margin: 5,
          width: 250,
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
      />
      <br />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          padding: "10px 20px",
          marginTop: 10,
          backgroundColor: "darkcyan",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: 15 }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;