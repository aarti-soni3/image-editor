const User = require("../Models/User");
const { comparePassword, hashPassword } = require("../utils/hasingPassword");

const login = async (req, res) => {

    const { username, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { username: username } });
    const isMatched = await comparePassword(password, user.password)

    if (isMatched)
        res.status(200).json({ message: 'login req received!' });
    else
        res.status(400).json({ message: 'invalid data' });
}

const register = async (req, res) => {

    try {
        const { name, username, mobile, email, password } = req.body;

        const data = {
            name: name,
            username: username,
            mobile: mobile,
            email: email,
            password: password
        }

        const user = await User.create(data);
        res.status(201).json({ message: 'register req received!' });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { login, register }