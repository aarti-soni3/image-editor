
const login = (req, res) => {
    console.log('login :', req.body)
    res.status(200).json({ message: 'login req received!' });
}

const register = (req, res) => {
    console.log('regi :', req.body)
    res.status(201).json({ message: 'register req received!' });
}

module.exports = { login, register }