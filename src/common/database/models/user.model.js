const { DataTypes, Model } = require("sequelize");

const sequelize = require("../config");

const User = sequelize.define(
    "User",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        balance: {
            allowNull: false,
            defaultValue: 10000,
            type: DataTypes.FLOAT,
        },
    },
    {
        sequelize,
        tableName: "Users",
        createdAt: false,
        updatedAt: false,
    },
);

module.exports = User;
