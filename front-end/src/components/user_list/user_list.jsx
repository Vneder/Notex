import React, { useEffect, useState } from "react";
import axios from "axios"; // Dodanie importu dla axios

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
    <div>
      <h2>Lista Użytkowników</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id} - {user.username} ({user.email}) - {user.password} - {user.creation_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersList;
