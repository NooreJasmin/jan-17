import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(""); // for Supabase auth
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!fullName || !email || !mobile || !password) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Supabase auth user
      const { data: userData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        alert(signUpError.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Insert profile into 'profiles' table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userData.user?.id, // Use Supabase user id
          full_name: fullName,
          mobile_number: mobile,
          email: email,
          address: address || null,
        },
      ]);

      if (profileError) {
        alert("Error creating profile: " + profileError.message);
        setLoading(false);
        return;
      }

      alert("Signup successful 🎉 You can now login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during signup");
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
      <h2>📝 Sign Up</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={{ padding: 10, margin: 5, width: 250, borderRadius: 5, border: "1px solid #ccc" }}
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, margin: 5, width: 250, borderRadius: 5, border: "1px solid #ccc" }}
      />
      <br />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{ padding: 10, margin: 5, width: 250, borderRadius: 5, border: "1px solid #ccc" }}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, margin: 5, width: 250, borderRadius: 5, border: "1px solid #ccc" }}
      />
      <br />

      <input
        type="text"
        placeholder="Address (optional)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: 10, margin: 5, width: 250, borderRadius: 5, border: "1px solid #ccc" }}
      />
      <br />

      <button
        onClick={handleSignup}
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
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p style={{ marginTop: 15 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;