const bcrypt = require('bcrypt');

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

// this.comparePassword('1234',)

const test = async () => {
    const hash = await this.hashPassword('12341234');
    console.log(hash)



    const isMached = await this.comparePassword('12341234', hash)
    console.log(isMached)
}

// test();