const crypto = require('crypto');

const generateSessionId = () => crypto.randomBytes(16).toString('hex');

module.exports = { generateSessionId };
