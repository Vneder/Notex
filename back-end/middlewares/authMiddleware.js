const verifySession = (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        console.log('Brak ciasteczka sessionId');
        return res.status(403).json({ message: 'Brak aktywnej sesji' });
    }

    const session = req.app.locals.sessions[sessionId];
    if (!session) {
        console.log('Brak sesji w req.app.locals.sessions dla sessionId:', sessionId);
        return res.status(403).json({ message: 'Brak aktywnej sesji' });
    }

    req.user = session;
    next();
};

module.exports = verifySession;
