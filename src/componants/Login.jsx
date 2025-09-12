import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://my-backend-1-2jy2.onrender.com"
  // const API_URL = "http://localhost:3000";

  const onsubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setErrorMsg("");
        reset();
        navigate("/");
        window.location.reload();
      } else {
        setErrorMsg(result.msg || "Invalid email or password");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[91.9vh] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-gray-900">
      <main className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="flex justify-center mt-6 min-h-[40vh]">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
              <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                Login
              </h2>
              <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                />

                {errorMsg && (
                  <p className="text-red-600 text-center ">{errorMsg}</p>
                )}

                <p className="text-center text-gray-600 mb-4">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="text-purple-600 font-medium hover:underline">
                    Sign Up
                  </Link>
                </p>

                <p className="text-sm text-center mt-2">
                  <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                    Forgot Password?
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg text-white transition transform duration-150 ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 active:scale-95"
                    }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
