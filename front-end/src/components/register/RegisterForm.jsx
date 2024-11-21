import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }), 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Rejestracja udana: Witaj ${data.user.username}!`);
        setUsername('');
        setPassword('');
        setEmail('');
      } else {
        setMessage(data.message || 'Rejestracja nie powiodła się.');
      }
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
      setMessage('Wystąpił problem z połączeniem z serwerem.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nazwa użytkownika:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ display: 'block', width: '100%', margin: '10px 0' }}
            />
          </label>
        </div>
        <div>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', margin: '10px 0' }}
            />
          </label>
        </div>
        <div>
          <label>
            Hasło:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%', margin: '10px 0' }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Zarejestruj się
        </button>
      </form>

      {}
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
          Przejdź do strony głównej
        </Link>
      </div>

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default RegisterForm;
