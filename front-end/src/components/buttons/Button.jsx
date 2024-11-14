// import React from 'react';

export function Button() {
    return (
        <button
          className={`button-jfx ${className}`} // Możliwość dodania dodatkowych klas CSS
          onClick={onClick} // Funkcja obsługująca kliknięcie
          type={type} // Domyślny typ przycisku
          style={style} // Dodatkowe style przekazywane przez props
        >
          {text} {/Rejestracja}
        </button>
      );
    };
  
  
  