const dotenv = require("dotenv");
dotenv.config();
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        pool: {
            max: 50,
            min: 5,
            acquire: 30000,
            idle: 10000,
        },
        port: Number(process.env.DB_PORT),
    },
);
