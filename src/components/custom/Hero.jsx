import { Link } from "react-router-dom";
import { Button } from "../ui/button"; 
import React from "react";

function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 gap-10 py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfdfd] via-[#f9fafb] to-[#f0fdfa] -z-10"></div>

      {/* Decorative Blobs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-[#f56551]/25 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#38bdf8]/25 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h1 className="text-center leading-tight tracking-tight">
        {/* Main Title */}
        <span className="block font-extrabold text-[44px] sm:text-[58px] md:text-[72px] text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#22c55e] drop-shadow-md">
          Explore Endless Journeys 🌍
        </span>

        {/* Sub Title */}
        <span className="mt-3 block text-gray-700 dark:text-gray-100 font-medium text-xl md:text-2xl italic">
          AI-Crafted Itineraries, Made Just for You ✨
        </span>
      </h1>

      {/* Subtext */}
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl leading-relaxed mt-4">
        Your <span className="font-semibold text-gray-900">personal travel curator</span> — 
        creating{" "}
        <span className="font-semibold bg-gradient-to-r from-[#f56551] via-[#f97316] to-[#facc15] text-transparent bg-clip-text">
          custom itineraries
        </span>{" "}
        tailored to your{" "}
        <span className="font-medium text-gray-800">interests</span>,{" "}
        <span className="font-medium text-gray-800">budget</span>, and{" "}
        <span className="font-medium text-gray-800">travel style</span>.  
        Let <span className="font-semibold text-[#2563eb]">AI</span> handle the planning — 
        you just enjoy the <span className="italic text-[#16a34a]">journey ✈️</span>.
      </p>

      {/* CTA Button */}
      <Link to={"/create-trip"}>
        <Button className="mt-6 bg-gradient-to-r from-[#2563eb] via-[#06b6d4] to-[#22c55e] text-white text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
          Start Planning for Free 🚀
        </Button>
      </Link>

      {/* Hero Image */}
      <img
        src="/landing.png"
        className="w-full max-w-5xl mt-12 drop-shadow-2xl rounded-2xl border border-gray-200"
        alt="Landing Preview"
      />
    </div>
  );
}

export default Hero;
