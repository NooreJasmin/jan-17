import React, { useState } from 'react';
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const navigate = useNavigate(); 
  const [loginMethod, setLoginMethod] = useState('mobile'); 
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Send OTP (Triggers "Free" flow if number is in your Supabase Test List)
  const handleSendOTP = async () => {
    if (!phone) return alert("Please enter a phone number");
    setLoading(true);

    // Ensures number starts with +91 (required for Supabase/Twilio)
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      setShowOtpInput(true);
      alert('OTP Request Successful!');
    }
    setLoading(false);
  };

  // 2. Verify the OTP and redirect to Home
  const handleVerifyOTP = async () => {
    setLoading(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      alert('Invalid OTP: ' + error.message);
    } else if (data.session) {
      alert('Login Successful!');
      // Navigate to "/" because in your App.tsx, Home is path="/"
      navigate('/'); 
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Crave Wave Login</h2>

      <div className="auth-toggle">
        <button onClick={() => setLoginMethod('email')} className={loginMethod === 'email' ? 'active' : ''}>
          Email
        </button>
        <button onClick={() => setLoginMethod('mobile')} className={loginMethod === 'mobile' ? 'active' : ''}>
          Mobile
        </button>
      </div>

      <div className="input-group">
        {loginMethod === 'email' ? (
          <>
            <input type="email" placeholder="Enter your Email" />
            <input type="password" placeholder="Password" />
            <button className="login-btn">Login</button>
          </>
        ) : (
          <>
            {!showOtpInput ? (
              <>
                <input 
                  type="tel" 
                  placeholder="+91 Mobile Number" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
                <button className="login-btn" onClick={handleSendOTP} disabled={loading}>
                  {loading ? 'Processing...' : 'Get OTP'}
                </button>
                <p style={{fontSize: '11px', color: '#888', marginTop: '10px'}}>
                  Enter test number to keep trial credit safe.
                </p>
              </>
            ) : (
              <>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                />
                <button className="login-btn" onClick={handleVerifyOTP} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>
                <button className="back-btn" onClick={() => setShowOtpInput(false)}>Change Number</button>
              </>
            )}
          </>
        )}
      </div>

      <style>{`
        .auth-toggle { margin-bottom: 20px; display: flex; gap: 10px; justify-content: center; }
        .auth-toggle button { cursor: pointer; padding: 8px 20px; border: 1px solid #ddd; background: white; border-radius: 4px; transition: 0.3s; }
        .auth-toggle button.active { background-color: #007bff; color: white; border-color: #007bff; }
        .input-group { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .input-group input { padding: 12px; border: 1px solid #ccc; border-radius: 4px; outline: none; font-size: 16px; }
        .login-btn { background: #28a745; color: white; border: none; padding: 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px; }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .back-btn { background: none; border: none; color: #666; font-size: 12px; cursor: pointer; text-decoration: underline; margin-top: 5px; }
        .auth-container { max-width: 350px; margin: 80px auto; text-align: center; border: 1px solid #eee; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
      `}</style>
    </div>
  );
}

export default Login;