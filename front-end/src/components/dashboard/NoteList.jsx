import React, { useState } from "react";

const NoteList = ({ notes, handleEditNote, handleDeleteNote }) => {
  // Stan przechowujący informację, czy notatka jest rozwinięta
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);
  
  // Stan przechowujący, która notatka jest edytowana
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  // Funkcja do zmiany stanu rozwinięcia notatki
  const toggleNoteExpand = (index) => {
    if (expandedNoteIndex === index) {
      setExpandedNoteIndex(null); // Jeśli ta notatka jest już rozwinięta, to ją zwijamy
    } else {
      setExpandedNoteIndex(index); // Rozwijamy notatkę
    }
  };

  // Funkcja do rozpoczęcia edytowania notatki
  const handleStartEditing = (index) => {
    setEditingNoteIndex(index); // Ustawiamy edytowaną notatkę
    handleEditNote(index); // Przekazujemy do funkcji obsługującej edytowanie notatki
  };

  // Funkcja do zakończenia edytowania notatki
  const handleStopEditing = () => {
    setEditingNoteIndex(null); // Resetujemy stan edycji
  };

  return (
    <div className="space-y-6 mt-8">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">{note.name}</h3>

          {/* Treść notatki z możliwością rozwinięcia */}
          <div className="w-full">
            <p className="text-gray-600 mb-4 break-words">
              {expandedNoteIndex === index
                ? note.note_content // Wyświetlamy całą treść, jeśli notatka jest rozwinięta
                : note.note_content.slice(0, 150)} {/* Pokażemy tylko pierwsze 150 znaków */}
            </p>
          </div>

          {/* Przycisk do rozwinięcia/zwinięcia notatki */}
          {note.note_content.length > 150 && (  // Sprawdzamy długość treści
            <button
              onClick={() => toggleNoteExpand(index)}
              className="text-blue-600 text-sm font-medium"
            >
              {expandedNoteIndex === index ? "Zwiń" : "Pokaż pełną notatkę"}
            </button>
          )}

          <div className="absolute top-4 right-4 flex space-x-3">
            {/* Edytuj */}
            <button
              onClick={() => handleStartEditing(index)}
              className="flex items-center justify-center w-24 h-10 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
            >
              <span>Edytuj</span>
              <svg
                width="30"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M21.263 2.293a1 1 0 0 0-1.414 0l-.872.872a3.001 3.001 0 0 0-3.415.587L4.955 14.358l5.657 5.657L21.218 9.408a3 3 0 0 0 .587-3.414l.872-.873a1 1 0 0 0 0-1.414l-1.414-1.414Zm-4.268 8.51-6.383 6.384-2.828-2.829 6.383-6.383 2.828 2.829Zm1.818-1.818.991-.99a1 1 0 0 0 0-1.415L18.39 5.166a1 1 0 0 0-1.414 0l-.991.99 2.828 2.83Z"
                  clipRule="evenodd"
                ></path>
                <path d="m2 22.95 2.122-7.778 5.656 5.657L2 22.95Z"></path>
              </svg>
            </button>

            {/* Usuń */}
            <button
              onClick={() => handleDeleteNote(index)}
              disabled={editingNoteIndex === index} // Disable delete button when editing
              className={`flex items-center justify-center w-24 h-10 ${editingNoteIndex === index ? 'bg-gray-400' : 'bg-red-600'} text-white text-sm font-medium rounded-md shadow-sm hover:${editingNoteIndex === index ? 'bg-gray-500' : 'bg-red-700'} focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300`}
            >
              <span>Usuń</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
        
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;