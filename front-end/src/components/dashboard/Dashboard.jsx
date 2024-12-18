import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../AuthContext/AuthContext";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
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
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          fetchNotes();
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Problem z pobraniem użytkownika", error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          console.error(
            "Błąd odpowiedzi serwera:",
            response.status,
            response.statusText
          );
          return;
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Błąd podczas pobierania notatek:", error);
      }
    };
    fetchNotes();

    fetchUserData();
  }, [navigate]);

  if (user === null) {
    return <p>Ładowanie danych...</p>;
  }

  const handleAddNote = async () => {
    if (!noteTitle || !currentNote) {
      return alert("Tytuł i treść notatki są wymagane");
    }
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: noteTitle, note_content: currentNote }),
      });

      if (!response.ok) {
        console.error(
          "Błąd odpowiedzi serwera:",
          response.status,
          response.statusText
        );
        return;
      }

      const responseData = await response.json();
      console.log("Odpowiedź z serwera:", responseData);
      setNotes([responseData.note, ...notes]);
    } catch (error) {
      console.error("Błąd dodawania notatki:", error);
    }
    setNoteTitle("");
    setCurrentNote("");
  };

  const handleEditNote = (index) => {
    setNoteTitle(notes[index].name);
    setCurrentNote(notes[index].note_content);
    setEditingIndex(index);
  };

  const handleUpdateNote = async () => {
    if (editingIndex === null) return; 
  
    const note = notes[editingIndex];
  
    try {
   
      const response = await fetch(`http://localhost:5000/api/notes/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: noteTitle, note_content: currentNote }),
      });
  
      if (!response.ok) {
        console.error("Błąd odpowiedzi serwera:", response.status, response.statusText);
        return;
      }
  
   
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = {
        ...note,
        name: noteTitle,
        note_content: currentNote,
      };
      setNotes(updatedNotes);
  

      setNoteTitle("");
      setCurrentNote("");
      setEditingIndex(null); 
    } catch (error) {
      console.error("Błąd aktualizacji notatki:", error);
    }
  };
  

  const handleDeleteNote = async (index) => {
    const note = notes[index];
    try {
      await fetch(`http://localhost:5000/api/notes/${note.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setNotes(notes.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Błąd usuwania notatki:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setMessage("Błąd podczas wylogowywania: " + error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 min-h-screen px-6 sm:px-8 md:px-12 py-16 overflow-hidden">
      <div className="relative w-full max-w-4xl bg-gray-50 bg-opacity-55 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 text-center sm:text-left">
        <div className="absolute inset-0 -z-10">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700 opacity-30 rounded-full blur-3xl absolute top-[-30%] left-[10%]"></div>
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-gradient-to-bl from-pink-400 via-red-500 to-yellow-500 opacity-30 rounded-full blur-3xl absolute bottom-[-20%] right-[10%]"></div>
          <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-tl from-green-400 via-teal-500 to-cyan-600 opacity-30 rounded-full blur-3xl absolute top-[20%] left-[-20%]"></div>
          <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-tr from-orange-400 via-yellow-500 to-amber-600 opacity-30 rounded-full blur-3xl absolute bottom-[10%] right-[-20%]"></div>
        </div>

        <Welcome username={user.username} />

        <div className="space-y-6 mt-6 md:space-y-10">
          <NoteForm
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
            handleAddNote={
              editingIndex === null ? handleAddNote : handleUpdateNote
            }
            editingIndex={editingIndex}
          />

          <NoteList
            notes={notes}
            handleEditNote={handleEditNote}
            handleDeleteNote={handleDeleteNote}
          />
        </div>

        <LogoutButton handleLogout={handleLogout} />
      </div>
    </div>
  );
}

