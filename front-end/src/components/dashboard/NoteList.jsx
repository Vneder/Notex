import React, { useState } from "react";

const NoteList = ({ notes, handleEditNote, handleDeleteNote }) => {
  const [expandedNoteIndex, setExpandedNoteIndex] = useState(null);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  const toggleNoteExpand = (index) => {
    setExpandedNoteIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleStartEditing = (index) => {
    setEditingNoteIndex(index);
    handleEditNote(index);
  };

  const handleStopEditing = () => {
    setEditingNoteIndex(null);
  };

  return (
    <div className="space-y-6 mt-6 sm:mt-8">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0 mb-4 sm:mb-0">
            <button
              onClick={() => handleStartEditing(index)}
              className="flex items-center justify-center w-full sm:w-24 h-10 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
            >
              Edytuj
            </button>

            <button
              onClick={() => handleDeleteNote(index)}
              disabled={editingNoteIndex === index}
              className={`flex items-center justify-center w-full sm:w-24 h-10 ${
                editingNoteIndex === index
                  ? "bg-gray-400"
                  : "bg-red-600 hover:bg-red-700"
              } text-white text-sm sm:text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300`}
            >
              Usuń
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 break-words">
            {note.name}
          </h3>

          <div className="w-full">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 break-words">
              {expandedNoteIndex === index
                ? note.note_content
                : note.note_content.slice(0, 150)}
              {note.note_content.length > 150 &&
                expandedNoteIndex !== index &&
                "..."}
            </p>
          </div>

          {note.note_content.length > 150 && (
            <button
              onClick={() => toggleNoteExpand(index)}
              className="text-blue-600 text-sm sm:text-base md:text-lg font-medium hover:underline"
            >
              {expandedNoteIndex === index ? "Zwiń" : "Pokaż pełną notatkę"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NoteList;
