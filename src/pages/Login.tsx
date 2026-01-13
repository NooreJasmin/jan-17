import React, { useState } from 'react';

function Login() {
  // State to track login method: 'email' or 'mobile'
  const [loginMethod, setLoginMethod] = useState('email');

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {/* Selection Tabs/Buttons */}
      <div className="auth-toggle">
        <button 
          onClick={() => setLoginMethod('email')}
          className={loginMethod === 'email' ? 'active' : ''}
        >
          Email
        </button>
        <button 
          onClick={() => setLoginMethod('mobile')}
          className={loginMethod === 'mobile' ? 'active' : ''}
        >
          Mobile
        </button>
      </div>

      {/* Conditional Rendering of Inputs */}
      <div className="input-group">
        {loginMethod === 'email' ? (
          <input type="email" placeholder="Enter your Email" />
        ) : (
          <input type="tel" placeholder="Enter Mobile Number" />
        )}
        
        <input type="password" placeholder="Password" />
      </div>

      <button className="login-btn">Login</button>

      <style>{`
        .auth-toggle { margin-bottom: 20px; display: flex; gap: 10px; }
        .auth-toggle button { cursor: pointer; padding: 5px 15px; }
        .auth-toggle button.active { background-color: #007bff; color: white; border: none; border-radius: 4px; }
        .input-group { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .auth-container { max-width: 300px; margin: 50px auto; text-align: center; border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
      `}</style>
    </div>
  );
}

export default Login;