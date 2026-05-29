const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");
const { hashPassword } = require("../utils/hasingPassword");

const User = sequelize.define(
    'users',
    {
        userId: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
        underscored: true,
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: { attributes: {} }
        },
        // hooks: {
        //     beforeCreate: async (user, option) => {
        //         const newPassword = await hashPassword(user.password)
        //         user.password = newPassword
        //     }
        // }
    })


const syncTable = async () => {
    await sequelize.sync({ force: true })
};

// syncTable();

User.beforeCreate(async (user, option) => {
    const newPassword = await hashPassword(user.password)
    user.password = newPassword
})

module.exports = User