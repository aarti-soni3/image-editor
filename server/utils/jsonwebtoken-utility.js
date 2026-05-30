const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (user) => {
    return jwt.sign({ data: user }, process.env.ACCESSTOKEN_KEY, { expiresIn: '15m' });
}

module.exports.generateRefreshToken = (user) => {
    return jwt.sign({ data: user }, process.env.REFRESHTOKEN_KEY, { expiresIn: '1h' });
}

module.exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESSTOKEN_KEY)
}