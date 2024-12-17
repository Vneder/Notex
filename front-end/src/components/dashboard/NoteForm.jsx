import React from "react";

const NoteForm = ({
  currentNote,
  setCurrentNote,
  handleAddNote,
  editingIndex,
  noteTitle,
  setNoteTitle,
}) => (
  <div className="flex flex-col w-full max-w-3xl mx-auto bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 rounded-2xl shadow-2xl space-y-4 border border-gray-300">
  {/* Tytuł notatki */}
  <input
    type="text"
    value={noteTitle}
    maxLength={32}
    onChange={(e) => setNoteTitle(e.target.value)}
    className="w-2/3 px-6 py-4 text-lg font-semibold text-gray-800 rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none transition-transform duration-200 ease-in-out"
    placeholder="Wprowadź tytuł notatki..."
  />
  
  {/* Treść notatki */}
  <textarea
    value={currentNote}
    onChange={(e) => setCurrentNote(e.target.value)}
    className="w-full px-6 py-6 text-base font-normal text-gray-700 leading-relaxed rounded-lg shadow-md focus:ring-4 focus:ring-blue-500 focus:outline-none resize-none overflow-auto transition-transform duration-200 ease-in-out"
    rows="12"
    maxLength={8192}
    placeholder="Wprowadź treść notatki tutaj..."
  />



    <button
      onClick={handleAddNote}
      className="relative w-36 h-12 flex items-center justify-center cursor-pointer bg-green-600 text-white rounded-lg overflow-hidden group transition-all duration-300 transform group-hover:scale-85"
    >
      {/* Napis "Dodaj" lub "Aktualizuj" */}
      <span className="absolute left-4 text-sm font-semibold transition-opacity duration-300 transform group-hover:opacity-0">
        {editingIndex === null ? "Dodaj" : "Aktualizuj"}
      </span>

      {/* Ikona plusa */}
      <span className="absolute right-4 flex items-center justify-center h-full w-8 bg-green-600 rounded-lg group-hover:w-16 transition-all duration-300 group-hover:translate-x-[-24px]  group-hover:rotate-90">
        <svg
          className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-90"
          fill="none"
          height={24}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1={12} x2={12} y1={5} y2={19} />
          <line x1={5} x2={19} y1={12} y2={12} />
        </svg>
      </span>
    </button>
  </div>
);

export default NoteForm;