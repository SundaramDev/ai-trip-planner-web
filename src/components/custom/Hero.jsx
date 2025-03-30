import { Link } from 'react-router-dom';
import { Button } from '../ui/button'; // Adjust the path as needed
import React from 'react';

function Hero() {
  return (
    <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center px-6 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16 leading-tight">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> <br />
        <span className="text-black">Personalized Itineraries at Your Fingertips</span>
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="bg-black  text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
          Get Started, It's Free
        </Button>
      </Link>
      <img src='/landing.png' className="w-full max-w-4xl mt-6" alt="Landing Image" />
    </div>
  );
}

export default Hero;
