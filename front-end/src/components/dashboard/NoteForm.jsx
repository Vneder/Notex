import React from "react";

const NoteForm = ({
  currentNote,
  setCurrentNote,
  handleAddNote,
  editingIndex,
}) => (
  <div className="flex flex-col w-full max-w-lg mx-auto">
    <textarea
      value={currentNote}
      onChange={(e) => setCurrentNote(e.target.value)}
      className="w-full px-6 py-4 text-lg rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition duration-200 ease-in-out"
      rows="4"
      placeholder="Wpisz swoją notatkę tutaj..."
    />
    <button
      onClick={handleAddNote}
      className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transform transition duration-200 ease-in-out"
    >
      {editingIndex === null ? "Dodaj Notatkę" : "Zaktualizuj Notatkę"}
    </button>
  </div>
);

export default NoteForm;
