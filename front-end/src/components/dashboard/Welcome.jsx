import React from "react";

const Welcome = ({ username }) => (
  <div className="flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8 md:px-12">
    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white bg-gradient-to-r from-slate-900 to-indigo-700 bg-clip-text text-transparent drop-shadow-lg mb-6 sm:mb-8 mt-8 sm:mt-12 animate-slide-in-down">
      Witaj{" "}
      <span className="inline-block text-red-900 animate-pulse">
        {username}
      </span>{" "}
      w{" "}
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-teal-800">
        Notex
      </span>
    </h2>
  </div>
);

export default Welcome;
