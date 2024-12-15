import React from "react";

const LogoutButton = ({ handleLogout }) => (
  <div className="mt-8">
    <button
      onClick={handleLogout}
      className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-500 transform transition duration-200 ease-in-out"
    >
      Wyloguj się
    </button>
  </div>
);

export default LogoutButton;
