import React from "react";
import { CheckCircle, Users, Target, Rocket } from "lucide-react";

function About() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">About Just Do It ✅</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Organize your tasks, stay productive, and accomplish your goals with simplicity and style.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-purple-700">Our Mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            At <span className="font-semibold">Just Do It</span>, we believe productivity should be simple. 
            Our mission is to provide a seamless way to track your tasks, set priorities, and 
            achieve your goals without distractions.
          </p>
        </div>
        <div className="flex justify-center">
          <CheckCircle className="w-32 h-32 text-purple-500" />
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          <p className="mt-3 text-lg text-gray-600">Everything you need to stay organized, in one place.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <Users className="w-12 h-12 text-purple-600 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg">User-Friendly</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Simple and intuitive interface that makes managing tasks effortless.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <Target className="w-12 h-12 text-pink-500 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg">Goal-Oriented</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Stay focused on what matters most with smart prioritization.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition">
              <Rocket className="w-12 h-12 text-purple-700 mx-auto" />
              <h3 className="mt-4 font-semibold text-lg">Fast & Reliable</h3>
              <p className="mt-2 text-gray-600 text-sm">
                Optimized performance ensures your tasks are always just a click away.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Start Organizing Today!</h2>
        <p className="mt-4 text-lg">Take control of your productivity with Just Do It ✅</p>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow hover:scale-105 transition"
        >
          Go to Dashboard
        </a>
      </section>
    </div>
  );
}

export default About;
