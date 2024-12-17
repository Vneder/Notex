import React, { useState } from "react";

const NoteSearch = ({ notes, setFilteredNotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filtrowanie notatek na podstawie wpisanej frazy
    const filteredNotes = notes.filter((note) =>
      note.name.toLowerCase().startsWith(searchValue)
    );
    setFilteredNotes(filteredNotes);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto mt-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Wyszukaj notatki po nazwie..."
        className="w-full px-5 py-3 text-base rounded-md shadow-inner focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all duration-200 ease-in-out"
      />
    </div>
  );
};

export default NoteSearch;
