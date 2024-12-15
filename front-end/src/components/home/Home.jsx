import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 min-h-screen px-4">
      <h1 className="text-5xl font-bold text-white text-center mb-6">
        Witaj w <span className="text-blue-500">Notex</span>
      </h1>
      <p className="text-gray-300 text-lg mb-8">
        Wybierz jedną z opcji, aby rozpocząć:
      </p>

      <div className="space-y-4">
        <Link
          to="/login"
          className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Zaloguj się
        </Link>
        <Link
          to="/register"
          className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Zarejestruj się
        </Link>
      </div>
    </div>
  );
};

export default Home;
