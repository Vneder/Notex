const express = require('express');
const pool = require('../config/db');
const verifySession = require('../middlewares/authMiddleware');

const router = express.Router();

// Endpoint dodawania nowej notatki
router.post('/', verifySession, async (req, res) => {
    const { name, note_content } = req.body;
    const ownerId = req.user.userId;

    if (!name || !note_content) {
        console.error('Niepoprawne dane wejściowe:', req.body);
        return res.status(400).json({ message: 'Nazwa i treść notatki są wymagane' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO note_list (owner_id, name, note_content, update_date, active) VALUES ($1, $2, $3, NOW(), true) RETURNING *',
            [ownerId, name, note_content]
        );

        res.status(201).json({
            message: 'Notatka została dodana',
            note: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd dodawania notatki:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Endpoint pobierania aktywnych notatek użytkownika
router.get('/', verifySession, async (req, res) => {
    const ownerId = req.user.userId;

    try {
        const result = await pool.query(
            'SELECT * FROM note_list WHERE owner_id = $1 AND active = true ORDER BY update_date DESC',
            [ownerId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Błąd pobierania notatek:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Endpoint edycji notatki
router.put('/:id', verifySession, async (req, res) => {
    const { id } = req.params;
    const { name, note_content } = req.body;
    const ownerId = req.user.userId;

    if (!name || !note_content) {
        return res.status(400).json({ message: 'Nazwa i treść notatki są wymagane' });
    }

    try {
        const result = await pool.query(
            'UPDATE note_list SET name = $1, note_content = $2, update_date = NOW() WHERE id = $3 AND owner_id = $4 RETURNING *',
            [name, note_content, id, ownerId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Notatka nie została znaleziona' });
        }

        res.json({
            message: 'Notatka została zaktualizowana',
            note: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd aktualizacji notatki:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Endpoint usuwania (dezaktywowania) notatki
router.delete('/:id', verifySession, async (req, res) => {
    const { id } = req.params;
    const ownerId = req.user.userId;

    try {
        const result = await pool.query(
            'UPDATE note_list SET active = false WHERE id = $1 AND owner_id = $2 RETURNING *',
            [id, ownerId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Notatka nie została znaleziona' });
        }

        res.json({ message: 'Notatka została usunięta' });
    } catch (error) {
        console.error('Błąd usuwania notatki:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

module.exports = router;
