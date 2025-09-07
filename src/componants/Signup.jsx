import React from 'react'
import { useForm } from 'react-hook-form'
import {  useNavigate } from "react-router-dom";
import { useState } from 'react';

const Signup = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("");
  


const onsubmit = async (data) => {
  try {
    const res = await fetch("https://my-backend-1-2jy2.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setErrorMsg(result.msg || "Something went wrong. Please try again.");
      return;
    }

    alert(result.msg || "Signup successful!");
    setErrorMsg("");
    reset();
    navigate("/login");
  } catch (err) {
    setErrorMsg("Failed to connect to server. Please try again later.");
  }
};


  return (
    <div className="h-[91.9vh] bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-gray-900">

      <main className="flex justify-center  ">
        <div className="w-full max-w-3xl">
          <div>
            <div className="flex justify-center mt-6 min-h-[40vh]">
              <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                  Signup
                </h2>
                <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
               
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: true,
                     
                      maxLength: {
                        value: 10,
                        message: "Username cannot exceed 10 characters",
                      },
                    })}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                  )}

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

                  <button
                  type="submit"
                  className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 active:scale-95 transition transform duration-150">
                  Signup
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Signup
