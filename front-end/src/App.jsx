import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
// import Dashboard from "./components/dashboard/Dashboard";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
