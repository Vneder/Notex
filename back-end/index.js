// backend/index.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors()); // Umożliwia połączenie z frontendem
app.use(express.json()); // Umożliwia przesyłanie danych w formacie JSON

// Konfiguracja połączenia z PostgreSQL
const pool = new Pool({
    user: 'postgres',         // Użytkownik bazy danych
    host: 'localhost',               // Host bazy danych (localhost, jeśli lokalnie)
    database: 'Notex',   // Nazwa bazy danych
    password: 'xrorp8JSsWw9zuj',         // Hasło użytkownika
    port: 5432,                      // Port PostgreSQL
});

// Endpoint, który zwraca dane z bazy danych
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Błąd połączenia z bazą danych');
    }
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
