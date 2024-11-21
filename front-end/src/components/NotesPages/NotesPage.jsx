import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotesPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/'); 
  };

  return (
    <div>
      <h2>Twoje Notatki</h2>
      {}
      <button onClick={handleLogout}>Wyloguj się</button>
    </div>
  );
};

export default NotesPage;
