// backend/index.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Notex',
    password: 'xrorp8JSsWw9zuj',
    port: 5432
});

app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Błąd połączenia z bazą danych');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sprawdzenie, czy użytkownik istnieje w bazie danych
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }

        // Sprawdzenie poprawności hasła
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }

        // Jeśli wszystko jest OK, zwróć sukces
        res.json({
            message: 'Logowanie udane',
            user: {
                id: user.id,
                username: user.username,
                email: user.email // Dodaj inne pola, jeśli są potrzebne
            }
        });
    } catch (error) {
        console.error('Błąd logowania:', error);
        res.status(500).send('Błąd serwera');
    }
});

app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Adres e-mail jest wymagany' });
    }

    try {
        // Sprawdzenie, czy użytkownik już istnieje
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Nazwa użytkownika jest już zajęta' });
        }

        // Sprawdzenie, czy e-mail jest już używany
        const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Adres e-mail jest już zarejestrowany' });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Zapisanie nowego użytkownika do bazy danych
        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );

        // Zwrócenie sukcesu
        res.status(201).json({
            message: 'Rejestracja zakończona sukcesem',
            user: {
                id: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email,
            },
        });
    } catch (error) {
        console.error('Błąd rejestracji:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});
