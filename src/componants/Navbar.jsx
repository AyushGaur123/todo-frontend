
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
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-xl font-bold text-purple-700 flex items-center">
            <img src={logo} alt="" width={60}/>
            Just Do It 
            {user?(
                <li className="text-green-600 list-none px-4">@{user.username}</li>

            ):""}
            </div>

          <ul className="hidden md:flex gap-8 text-lg font-semibold text-purple-700 items-center">
            <NavLink className="hover:text-pink-600 cursor-pointer" to="/">
              <li>Home</li>
            </NavLink>
          <NavLink className="hover:text-pink-600 cursor-pointer" to="/about" ><li >About</li></NavLink>
          <NavLink className="hover:text-pink-600 cursor-pointer" to="/services" ><li >Services</li></NavLink>

            <li className="hover:text-pink-600 cursor-pointer"   >
               <Link to="contact"  smooth={true}   duration={500}   offset={-50}>  Contact </Link>
                
               
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
                className="hover:text-pink-600 cursor-pointer"
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

      {isOpen && (
        <ul className="md:hidden bg-purple-50 px-4 pb-4 space-y-2 text-purple-700 font-semibold">
          <NavLink
            className="block hover:text-pink-600 cursor-pointer"
            to="/"
            onClick={() => setIsOpen(false)}>
            <li>Home</li>
          </NavLink>
          
          <NavLink className="hover:text-pink-600 cursor-pointer" to="/about" ><li >About</li></NavLink>
          <NavLink className="hover:text-pink-600 cursor-pointer" to="/services" ><li >Services</li></NavLink>
          <li className="hover:text-pink-600 cursor-pointer">
             <Link to="contact"   smooth={true}  duration={500}  offset={-50}    >      Contact    </Link> 
           </li>
          {user ? (
            <>
              <li className="text-green-600">{user.username}</li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <NavLink
              className="block hover:text-pink-600 cursor-pointer"
              to="/login"
              onClick={() => setIsOpen(false)}>
              <li>Login</li>
            </NavLink>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
