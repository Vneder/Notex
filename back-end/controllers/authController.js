const bcrypt = require('bcrypt');
const pool = require('../config/db');
const { generateSessionId } = require('../utils.js/sessionUtils');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log('Dane logowania:', { username, password });

        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            console.log('Nie znaleziono użytkownika o nazwie:', username);
            return res.status(400).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Nieprawidłowe hasło dla użytkownika:', username);
            return res.status(400).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło' });
        }

        const sessionId = generateSessionId();
        console.log('Wygenerowano sessionId:', sessionId);

        req.app.locals.sessions[sessionId] = { userId: user.id, username: user.username };
        console.log('Sesja została zapisana w req.app.locals.sessions:', req.app.locals.sessions);

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 3600000
        });
        console.log('Ciasteczko sessionId ustawione');

        res.json({
            message: 'Logowanie udane',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('Błąd logowania:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

const register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ message: 'Nazwa użytkownika, email i hasło są wymagane' });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Nieprawidłowy adres email' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Nazwa użytkownika jest już zajęta' });
        }

        const existingEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Adres e-mail jest już zarejestrowany' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );

        res.status(201).json({
            message: 'Rejestracja zakończona sukcesem',
            user: { id: result.rows[0].id, username: result.rows[0].username, email: result.rows[0].email }
        });
    } catch (error) {
        console.error('Błąd rejestracji:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
};

const logout = (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !req.app.locals.sessions[sessionId]) {
        return res.status(400).json({ message: 'Brak aktywnej sesji' });
    }
    delete req.app.locals.sessions[sessionId];
    res.clearCookie('sessionId');
    res.json({ message: 'Wylogowano pomyślnie' });
};

module.exports = { login, register, logout };
