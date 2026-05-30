const User = require("../Models/User");
const { comparePassword, hashPassword } = require("../utils/hasingPassword");
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/jsonwebtoken-utility");

const login = async (req, res) => {

    const { username, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { username: username } });
    const isMatched = await comparePassword(password, user.password)

    if (isMatched)
        res.status(200).json({ data: { message: 'login req received!' } });
    else
        res.status(400).json({ data: { message: 'invalid data' } });
}

const register = async (req, res) => {

    const { name, username, mobile, email, password } = req.body;

    const data = {
        name: name,
        username: username,
        mobile: mobile,
        email: email,
        password: password
    }

    let findUser = await User.findOne({ where: { username: data.username } });

    if (findUser)
        return res.status(400).json({ message: 'Username already exist!' })

    findUser = await User.findOne({ where: { email: data.email } });

    if (findUser)
        return res.status(400).json({ message: 'Email already exist!' })

    const user = await User.create(data);
    const accessToken = generateAccessToken({ userId: user.userId, username: user.username, mobile: user.mobile, email: user.email })
    const refreshToken = generateRefreshToken({ userId: user.userId, username: user.username, mobile: user.mobile, email: user.email })

    return res.status(201).json({ data: { user: user, accessToken: accessToken, refreshToken: refreshToken, message: 'Registered Successfully!' } });
}

const access = async (req, res) => {
    const accessToken = req.headers.authorization;

    const token = accessToken && accessToken.split(' ')[1];
    console.log('token :', token)

    if (!token)
        return res.status(400).json({ data: { message: 'Access denied...No token available!' } })

    const decodeUser = verifyToken(token)

    if (!decodeUser)
        return res.status(403).json({ data: { message: 'Invalid or expired token!' } })

    console.log(decodeUser)
    return res.status(200).json({ data: { user: decodeUser, message: 'success' } })
}

module.exports = { login, register, access }