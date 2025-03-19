const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
    await queryInterface.createTable("Users", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        balance: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 10000,
        },
    });
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable("Users");
}

module.exports = { up, down };
