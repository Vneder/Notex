import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext"; // Import kontekstu

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn, loading, login } = useAuth(); // Użycie stanu zalogowania z kontekstu

  // Jeśli użytkownik jest już zalogowany, przekierowujemy na dashboard
  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, loading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // Zaloguj użytkownika
        navigate("/dashboard"); // Przekierowanie na dashboard
        setMessage(`Witaj ${data.user.username}!`);
        setUsername("");
        setPassword("");
      } else {
        setMessage(data.message || "Błąd logowania.");
      }
    } catch (error) {
      console.error("Błąd podczas logowania:", error);
      setMessage("Wystąpił problem z połączeniem z serwerem.");
    }
  };

  // Jeśli dane są w trakcie ładowania, wyświetlamy komunikat
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 pt-10">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Logowanie
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nazwa użytkownika:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Hasło:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Zaloguj się
          </button>
        </form>

        <h3 className="text-xl font-bold text-gray-800 text-center mb-6 mt-6">
          Nie masz jeszcze konta?{" "}
        </h3>

        <Link
          to="/register"
          className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Zarejestruj się
        </Link>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            Przejdź do strony głównej
          </Link>
        </div>

        {message && (
          <p className="mt-4 text-red-500 text-center font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
