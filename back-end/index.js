const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const userController = require('./controllers/userController');
const verifySession = require('./middlewares/authMiddleware');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        console.error('Błąd parsowania JSON:', error.message);
        return res.status(400).json({ message: 'Niepoprawne dane JSON' });
    }
    next();
});

app.locals.sessions = {};

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.get('/api/data', verifySession, userController.getUsers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
