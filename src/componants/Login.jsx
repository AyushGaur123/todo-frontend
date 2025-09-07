import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate()

  const onsubmit = async (data) => {
    try {
      const res = await fetch("https://my-backend-1-2jy2.onrender.com/login", {
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
                <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 active:scale-95 transition transform duration-150">
                  Login
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
