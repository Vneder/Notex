// import React from 'react';
export function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">NOTEX</h1>
        <h3 className="subtitle">Twój prywatny notatnik</h3>
        <nav>
          <a href="login.html" className="nav-link">
            Zaloguj się
          </a>
          <a href="register.html" className="nav-link primary">
            Zarejestruj się
          </a>
        </nav>
      </div>
    </header>
  );
}
