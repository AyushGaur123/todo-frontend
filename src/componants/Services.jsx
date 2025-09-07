import React from "react";
import { UserPlus, LogIn, LogOut, CheckSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "User Registration",
      description:
        "Sign up to create your personal account. Your tasks stay safe and private to you.",
    },
    {
      icon: <LogIn className="w-8 h-8" />,
      title: "Login",
      description:
        "Access your dashboard anytime by logging in. Pick up right where you left off.",
    },
    {
      icon: <CheckSquare className="w-8 h-8" />,
      title: "Task Management",
      description:
        "Add, mark complete, or delete tasks easily. Keep your productivity on track.",
    },
    {
      icon: <LogOut className="w-8 h-8" />,
      title: "Secure Logout",
      description:
        "Logout instantly to keep your data safe. Your tasks are stored securely in your local storage.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="py-16 px-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold">Our Services</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg">
          A secure and simple way to manage your daily tasks with confidence.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center"
          >
            <div className="flex justify-center mb-4 text-purple-600">
              <div className="p-4 rounded-full bg-purple-50">{service.icon}</div>
            </div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="mt-3 text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </section>

      <div className="text-center py-12">
        <NavLink
          to="/"
          className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95"
        >
          Go To Dashboard
        </NavLink>
      </div>
    </div>
  );
}



