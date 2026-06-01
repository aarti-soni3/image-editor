const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (user) => {
    return jwt.sign({ data: user }, process.env.ACCESSTOKEN_KEY, { expiresIn: '1h' });
}

module.exports.generateRefreshToken = (user) => {
    return jwt.sign({ data: user }, process.env.REFRESHTOKEN_KEY, { expiresIn: '1d' });
}

module.exports.verifyToken = (token, key) => {
    return jwt.verify(token, key)
}