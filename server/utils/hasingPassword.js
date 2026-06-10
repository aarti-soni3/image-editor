const bcrypt = require('bcrypt');
const AppError = require('./AppError');

module.exports.hashPassword = async (password, saltRounds = 12) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

module.exports.comparePassword = async (password, originalPassword) => {
    try {
        return await bcrypt.compare(password, originalPassword)
    } catch (error) {
        console.log(error)
    }
}