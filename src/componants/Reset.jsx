import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // const API_URL = "http://localhost:3000";
  const  API_URL = "https://my-backend-1-2jy2.onrender.com"


  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMsg(result.msg || "Error resetting password");
        return;
      }
      alert("✅ Password reset successful! Please login.");
      navigate("/login");
    } catch (err) {
      setErrorMsg("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Missing email. Please try again.
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
