import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Witaj ${data.user.username}!`);
        setUsername('');
        setPassword('');
      } else {
        setMessage(data.message || 'Błąd logowania.');
      }
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      setMessage('Wystąpił problem z połączeniem z serwerem.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Logowanie</h2>
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
          Zaloguj się
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

export default LoginForm;
