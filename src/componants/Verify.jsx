import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, purpose } = location.state || {};
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // const API_URL = "http://localhost:3000";
  const API_URL = "https://my-backend-1-2jy2.onrender.com"


  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, purpose }),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMsg(result.msg || "Invalid OTP");
        return;
      }

      if (purpose === "signup") {
        alert("✅ Signup complete! You can now login.");
        navigate("/login");
      } else if (purpose === "reset") {
        alert("✅ OTP verified! Please reset your password.");
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setErrorMsg("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!email || !purpose) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Missing data. Please try again.
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-start pt-24 justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          {purpose === "signup" ? "Verify Signup OTP" : "Verify Reset OTP"}
        </h2>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />
          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
