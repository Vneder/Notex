import React from "react";

const NoteList = ({ notes, handleEditNote, handleDeleteNote }) => (
  <div className="space-y-4 mt-6">
    {notes.map((note, index) => (
      <div
        key={index}
        className="relative bg-yellow p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
      >
        <span className="whitespace-pre-wrap break-words text-lg text-gray-800">
          {note}
        </span>
        <div className="absolute top-4 right-4 space-x-4">
          <button
            onClick={() => handleEditNote(index)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 focus:outline-none"
          >
            Edytuj
          </button>
          <button
            onClick={() => handleDeleteNote(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-400 focus:outline-none"
          >
            Usuń
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default NoteList;
