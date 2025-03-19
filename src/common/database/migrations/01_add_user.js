const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
    await queryInterface.sequelize.query(
        `INSERT INTO "Users" (id, balance) VALUES(1, 10000);`,
    );
}

async function down({ context: queryInterface }) {
    await queryInterface.sequelize.query(`DELETE FROM "Users" WHERE id = 1;`);
}

module.exports = { up, down };
