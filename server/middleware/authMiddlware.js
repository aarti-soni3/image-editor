const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { Op } = require("sequelize");

module.exports.isEmailOrUsernameExist = async (req, res, next) => {

    const { username, email } = req.body;
    // let findUser = await User.findOne({ where: { username: req?.body?.username } });
    let findUser = await User.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    });

    if (findUser) {
        if (findUser.username === username)
            return res.status(400).json({ message: 'Username already exist!' })
        else if (findUser.email === email)
            return res.status(400).json({ message: 'Email already exist!' })
    }

    next();
}

module.exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(400).json({ message: 'Access denied...No token available!' });

    jwt.verify(token, process.env.ACCESSTOKEN_KEY, (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError')
                return res.status(401).json({ data: { message: 'Token expired!' } });

            return res.status(403).json({ data: { message: 'Invalid token!' } });
        }
        req.decodedUser = decoded
        next();
    });
}