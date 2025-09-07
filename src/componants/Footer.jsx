import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import logo from '../assets/logo.png'


function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="flex justify-center space-x-6 mb-8">
        <a href="https://github.com/AyushGaur123" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/ayush-gaur-7227b9338/" target="_blank" rel="noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
          <Instagram className="w-5 h-5" />
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="flex items-center gap-2  text-white">
            <img src={logo} alt="" width={60}/>
            
            <div>
            <h1 className="text-xl font-bold" >Plan Smart, Do Smart</h1>
              <p className="mt-1 text-center md:text-left "> Stay organized, stay unstoppable.</p>
            </div>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10 justify-center md:justify-end">
          <div>
            <h1 className="font-semibold text-white mb-3">Resources</h1>
            <ul className="space-y-2 text-sm">
              <li><a href="https://chatgpt.com/" target="_blank" className="hover:text-purple-400">ChatGPT</a></li>
              <li><a href="https://google.com/" target="_blank" className="hover:text-purple-400">Google</a></li>
              <li><a href="https://youtube.com/" target="_blank" className="hover:text-purple-400">You tube</a></li>
            </ul>
          </div>

          <div id="contact">
            <h1 className="font-semibold text-white mb-3">Contact Us</h1>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+91 6388872207" className="hover:text-purple-400">+91 6388872207</a></li>
              <li><a href="https://github.com/AyushGaur123" target="_blank" className="hover:text-purple-400">Ayush123 (GitHub)</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Just Do It ✅. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;


