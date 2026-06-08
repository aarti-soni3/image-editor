const { DataTypes } = require("sequelize");
const { sequelize } = require("../Config/db");
const User = require("./User");

const Image = sequelize.define(
    'images',
    {
        imageId: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        imageLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        underscored: true,
    }
)

User.hasMany(Image, {
    foreignKey: 'userId',
    allowNull: false,
})
Image.belongsTo(User, {
    foreignKey: 'userId'
})

const syncTable = async () => {
    await sequelize.sync({ alter:false })
}

// syncTable();

module.exports = Image