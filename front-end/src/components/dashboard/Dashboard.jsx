import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../AuthContext/AuthContext"; // Import kontekstu

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          credentials: "include", // Ważne, aby ciasteczka były wysyłane
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Zapisz dane użytkownika
        } else {
          setMessage("Nie udało się pobrać danych użytkownika.");
          console.log("Nie udało się pobrać danych użytkownika." + response);
          navigate("/login"); // Przekierowanie na stronę logowania
        }
      } catch (error) {
        setMessage("Wystąpił problem z połączeniem." + error);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (user === null) {
    return <p>Ładowanie danych...</p>;
  }

  const handleAddNote = () => {
    if (editingIndex === null) {
      setNotes([...notes, currentNote]);
    } else {
      const updatedNotes = notes.map((note, index) =>
        index === editingIndex ? currentNote : note
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    }
    setCurrentNote("");
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleLogout = async () => {
    try {
      await logout(); // Wywołanie logout z kontekstu
      navigate("/login"); // Przekierowanie na stronę logowania
    } catch (error) {
      setMessage("Błąd podczas wylogowywania: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 min-h-screen px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 text-center">
        <Welcome username={user.username} />

        <div className="space-y-5">
          <NoteForm
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            handleAddNote={handleAddNote}
            editingIndex={editingIndex}
          />

          <NoteList
            notes={notes}
            handleEditNote={handleEditNote}
            handleDeleteNote={handleDeleteNote}
          />

          <LogoutButton handleLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}
