import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Witaj w aplikacji
        </h1>
        <p className="text-lg text-gray-600 mb-6">Wybierz opcję:</p>

        <div className="flex flex-col space-y-4">
          {/* Zaloguj się */}
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Zaloguj się
          </Link>
          <br />

          {/* Zarejestruj się */}
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
