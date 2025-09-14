
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import logo from '../assets/logo.png'

const Navbar = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const API_URL = "https://my-backend-1-2jy2.onrender.com"

  // const API_URL = " http://localhost:3000"

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `${token}` },
      });
      const result = await res.json();
      setUser(result);
      localStorage.setItem("user", JSON.stringify(result));
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  return (
    <nav className="bg-white  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-purple-700 flex items-center">
            <img src={logo} alt="" width={60} />
            Just Do It
            {user ? (
              <li className="text-green-600 list-none px-4">@{user.username}</li>

            ) : ""}
          </div>

          <ul className="hidden md:flex gap-8 text-lg font-semibold text-purple-700 items-center">
            <NavLink className={({ isActive }) =>
              `cursor-pointer ${isActive ? "text-pink-600" : "text-purple-700"} hover:text-pink-600`
            } to="/">
              <li>Home</li>
            </NavLink>
            <NavLink className={({ isActive }) =>
              `cursor-pointer ${isActive ? "text-pink-600" : "text-purple-700"} hover:text-pink-600`
            } to="/about" ><li >About</li></NavLink>
            <NavLink className={({ isActive }) =>
              `cursor-pointer ${isActive ? "text-pink-600" : "text-purple-700"} hover:text-pink-600`
            } to="/services" ><li >Services</li></NavLink>

            <li className="hover:text-pink-600 cursor-pointer"   >
              <Link to="contact" smooth={true} duration={500} offset={-50}>  Contact </Link>


            </li>
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `cursor-pointer ${isActive ? "text-pink-600" : "text-purple-700"} hover:text-pink-600`
                }
                to="/login"
              >
                <li>Login</li>
              </NavLink>
            )}
          </ul>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-purple-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>



<div
  className={`fixed inset-0 transition-opacity duration-500 z-40 
    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
  onClick={() => setIsOpen(false)}
></div>

<div
  className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50
    transform transition-transform duration-500 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white font-bold text-xl shadow-md">
    Just Do It
  </div>

  <ul className="p-6 space-y-3 text-purple-700 font-semibold">
    <li>
      <NavLink
        className={({ isActive }) =>
          `block py-2 px-3 rounded-lg transition ${
            isActive
              ? "bg-pink-100 text-pink-600"
              : "hover:bg-purple-50 hover:text-pink-600"
          }`
        }
        to="/"
        onClick={() => setIsOpen(false)}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          `block py-2 px-3 rounded-lg transition ${
            isActive
              ? "bg-pink-100 text-pink-600"
              : "hover:bg-purple-50 hover:text-pink-600"
          }`
        }
        to="/about"
        onClick={() => setIsOpen(false)}
      >
        About
      </NavLink>
    </li>
    <li>
      <NavLink
        className={({ isActive }) =>
          `block py-2 px-3 rounded-lg transition ${
            isActive
              ? "bg-pink-100 text-pink-600"
              : "hover:bg-purple-50 hover:text-pink-600"
          }`
        }
        to="/services"
        onClick={() => setIsOpen(false)}
      >
        Services
      </NavLink>
    </li>
    <li>
      <Link
        to="contact"
        smooth={true}
        duration={500}
        offset={-50}
        onClick={() => setIsOpen(false)}
        className="block py-2 px-3 rounded-lg hover:bg-purple-50 hover:text-pink-600 transition cursor-pointer"
      >
        Contact
      </Link>
    </li>


    {user ? (
      <>
        <li className="text-green-600 px-3 my-2 font-bold">{user.username}</li>
        <li>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full bg-red-500 text-white px-4 py-2 my-4 rounded-lg hover:bg-red-600 transition shadow-md"
          >
            Logout
          </button>
        </li>
      </>
    ) : (
      <li>
        <NavLink
          className={({ isActive }) =>
            `block  px-3 rounded-lg transition ${
              isActive
                ? "bg-pink-100 text-pink-600"
                : "hover:bg-purple-50 hover:text-pink-600"
            }`
          }
          to="/login"
          onClick={() => setIsOpen(false)}
        >
          Login
        </NavLink>
      </li>
    )}
  </ul>
</div>


    </nav>
  );
};

export default Navbar;
