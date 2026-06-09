const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { comparePassword, hashPassword } = require("../utils/hasingPassword");
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/jsonwebtoken-utility");

const login = async (req, res) => {

    const { username, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { username: username } });
    const isMatched = await comparePassword(password, user.password)

    const accessToken = generateAccessToken({ userId: user.userId, username: user.username, mobile: user.mobile, email: user.email })
    const refreshToken = generateRefreshToken({ userId: user.userId, username: user.username, mobile: user.mobile, email: user.email })

    if (isMatched)
        res.status(200).json({ data: { user: user, accessToken: accessToken, refreshToken: refreshToken, message: 'Loggedin Successfully!' } });
    else
        res.status(400).json({ data: { message: 'Invalid username or password!' } });
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

    const user = await User.create(data);
    const accessToken = generateAccessToken({ userId: user.userId, username: user.username, mobile: user.mobile, email: user.email })
    const refreshToken = generateRefreshToken({ userId: user.userId, username: user.username, mobile: user.mobile, email: user.email })

    return res.status(201).json({ data: { user: user, accessToken: accessToken, refreshToken: refreshToken, message: 'Registered Successfully!' } });
}

const access = async (req, res) => {
    return res.status(200).json({ data: { user: req.decodedUser?.data, message: 'success' } });
}

const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken)
            return res.status(400).json({ data: { message: 'Access denied...No token available!' } });

        const decodedUser = verifyToken(refreshToken, process.env.REFRESHTOKEN_KEY);

        if (!decodedUser)
            return res.status(403).json({ data: { message: 'Invalid or expired token!' } });

        const user = decodedUser.data;
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        return res.status(200).json({ data: { user, accessToken, refreshToken: newRefreshToken, message: 'Token refreshed successfully!' } });
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return res.status(403).json({ data: { message: 'Invalid or expired token!' } });

        return res.status(500).json({ data: { message: 'Something went wrong!' } });
    }
}

module.exports = { login, register, access, refresh }