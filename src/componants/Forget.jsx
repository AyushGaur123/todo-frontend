import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://my-backend-1-2jy2.onrender.com"

  // const API_URL = "http://localhost:3000";

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMsg(result.msg || "Error sending OTP");
        return;
      }
      alert("✅ OTP sent to your email!");
      navigate("/verify", { state: { email, purpose: "reset" } });
    } catch (err) {
      setErrorMsg("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex  items-start pt-24  justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[380px]">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
