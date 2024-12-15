const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const userController = require('./controllers/userController');
const verifySession = require('./middlewares/authMiddleware');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.locals.sessions = {};  // Wstępna sesja w pamięci

app.use('/api/auth', authRoutes);
app.get('/api/data', verifySession, userController.getUsers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
