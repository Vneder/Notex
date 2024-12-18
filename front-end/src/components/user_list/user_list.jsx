import React, { useEffect, useState } from "react";
import axios from "axios";

export function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setUsers(response.data);
      } catch (err) {
        console.error("Wystąpił błąd podczas pobierania użytkowników", err);
        setError("Nie udało się pobrać danych użytkowników.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col bg-slate-900 mt-10 pb-10">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Admin user:
        </h2>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ul className="divide-y divide-gray-300">
            {users
              .filter((user) => user.id === 7)
              .map((user) => (
                <li
                  key={user.id}
                  className="py-2 px-3 bg-gray-100 rounded-lg mb-2 shadow-md"
                >
                  <p className="text-gray-800">
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p className="text-gray-800">
                    <strong>Pass:</strong> admin
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UsersList;
