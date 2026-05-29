const { Sequelize } = require('sequelize')

const dbName = process.env.DB_NAME || 'picBlend'
const dbUsername = process.env.DB_USERNAME || 'aarti'
const dbPassword = process.env.DB_PASSWORD || 'aarti@123'

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.log(`Unable to connect to the database: ${error.message}`)
    }
}

module.exports = { sequelize, connectToDatabase }