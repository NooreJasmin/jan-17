import { useState } from "react";
export default function Payment() {
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const sendMessage = () => {
    if (!phone) {
      alert("Please enter WhatsApp number");
      return;
    }

    const message =
      "🍔 Order confirmed! Crave Wave is preparing your food 😋 Enjoy your meal! 🛵";

    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const submitFeedback = () => {
    if (!rating) return alert("Please tap a star rating ⭐");
    alert(`Thanks! You rated us ⭐ ${rating}/5`);
  };

  return (
    <>
      <style>{`
      .payment-container {
        max-width: 420px;
        margin: 40px auto;
        padding: 24px;
        text-align: center;
        color: black;
        border-radius: 14px;
        background: #ffffff;
        border: 1px solid #e8e8e8;
        box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        font-family: "Poppins", Arial, sans-serif;
      }
      .pay-btn {
        padding: 12px;
        width: 100%;
        font-size: 16px;
        border-radius: 10px;
        background: darkcyan;
        border: none;
        color: white;
        margin-top: 14px;
        cursor: pointer;
      }
      .phone-input {
        width: 60%;
        padding: 10px;
        margin-top: 14px;
        border-radius: 8px;
        border: 1px solid #ccc;
        font-size: 15px;
      }
      .star-box {
        display: flex;
        justify-content: center;
        gap: 8px;
        font-size: 34px;
        margin-top: 20px;
        cursor: pointer;
        user-select: none;
      }
      .star {
  color: #ccc;
  font-size: 34px;
  border: 2px solid #ccc;
  padding: 4px;
  border-radius: 6px;
  transition: 0.25s;
}

      .star.fill {
        color: gold;
      }
      `}</style>

      <div className="payment-container">
        <h2>💳 Payment</h2>

        <img
          src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg"
          width={100}
        />

        <p>Scan & Pay</p>

        <img src="/QR.png" alt="UPI QR" style={{ width: 200, borderRadius: 8 }} />
        <button
  onClick={() => alert("Your order is confirmed successfully! 🎉")}
  className="pay-btn"
>
  Payment Done
</button>

        <input
          type="tel"
          placeholder="Enter WhatsApp Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="phone-input"
        />

        <button className="pay-btn" onClick={sendMessage}>
          Check Order on WhatsApp
        </button>

        {/* ⭐ STAR RATING */}
        <h3 style={{ marginTop: "30px" }}>Rate Your Experience</h3>

        <div className="star-box">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={
                num <= (hoverStar || rating) ? "star fill" : "star"
              }
              onMouseEnter={() => setHoverStar(num)}
              onMouseLeave={() => setHoverStar(0)}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        <button className="pay-btn" onClick={submitFeedback}>
          Submit ⭐
        </button>
      </div>
    </>
  );
}