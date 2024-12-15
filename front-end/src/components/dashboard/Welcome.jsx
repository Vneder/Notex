import React from "react";

const Welcome = ({ username }) => (
  <h2 className="text-4xl text-gray-800 font-bold mb-8">
    Witaj <span className="text-indigo-800">{username}</span> w{" "}
    <span className="text-indigo-800">Notex</span>
  </h2>
);

export default Welcome;
