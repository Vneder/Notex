import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home"; // Strona wejściowa
import NotesPage from "./components/NotesPages/NotesPage"; // Strona z notatkami
import LoginForm from "./components/login/LoginForm"; // Logowanie
import RegisterForm from "./components/register/RegisterForm"; // Rejestracja
const App = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Home />} />

        {}
        <Route path="/register" element={<RegisterForm />} />

        {}
        <Route path="/login" element={<LoginForm />} />

        {}
        <Route path="/NotesPages" element={<NotesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
