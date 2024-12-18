const express = require('express');
const { login, register, logout } = require('../controllers/authController');
const verifySession = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

router.get('/user', verifySession, (req, res) => {
    const { username, email } = req.user;
    res.json({
        username,
        email,
        message: 'Dane użytkownika'
    });
});

module.exports = router;
