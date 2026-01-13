import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      {/* Import Inter Font */}
      <style>
        @import url('fonts.googleapis.com');
      </style>

      <h2>Create Account</h2>
      <p className="subtitle">Join our community today</p>

      <div className="input-group">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
        />
        <input 
          type="tel" 
          name="mobile" 
          placeholder="Mobile Number" 
          onChange={handleChange} 
        />
        <textarea 
          name="address" 
          placeholder="Full Address" 
          rows="3"
          onChange={handleChange}
        />
        
        <div className="password-wrapper">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
          />
          <button 
            type="button" 
            className="toggle-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button className="signup-btn">Sign Up</button>

      <style>{`
        .auth-container { 
          max-width: 400px; 
          margin: 60px auto; 
          padding: 32px; 
          border-radius: 12px; 
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          font-family: 'Inter', -apple-system, sans-serif;
        }
        
        h2 { margin: 0 0 8px 0; color: #1a1a1a; font-weight: 600; text-align: center; }
        .subtitle { margin-bottom: 24px; color: #666; font-size: 14px; text-align: center; }

        .input-group { display: flex; flex-direction: column; gap: 16px; }
        
        input, textarea { 
          padding: 12px 16px; 
          border-radius: 8px; 
          border: 1px solid #e0e0e0; 
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .password-wrapper { display: flex; position: relative; }
        .password-wrapper input { width: 100%; padding-right: 60px; }
        
        .toggle-btn { 
          position: absolute; 
          right: 12px; 
          top: 50%; 
          transform: translateY(-50%); 
          background: none; 
          border: none; 
          cursor: pointer; 
          color: #4f46e5; 
          font-weight: 500;
          font-size: 13px; 
          font-family: 'Inter', sans-serif;
        }

        .signup-btn { 
          margin-top: 24px; 
          padding: 14px; 
          background-color: #4f46e5; 
          color: white; 
          border: none; 
          border-radius: 8px; 
          font-weight: 600;
          font-size: 16px;
          cursor: pointer; 
          width: 100%; 
          transition: background-color 0.2s;
        }

        .signup-btn:hover {
          background-color: #4338ca;
        }
      `}</style>
    </div>
  );
}

export default Signup;