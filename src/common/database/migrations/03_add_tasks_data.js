const { Sequelize } = require("sequelize");
const TaskStatus = require("../../constants/task-status.constant");

async function up({ context: queryInterface }) {
  const tasks = [];
  for (let i = 0; i < 10; i++) {
    tasks.push({
      name: `Task ${i + 1}`,
      interval_seconds: Math.floor(Math.random() * (300 - 120 + 1)) + 120, // from 120 to 300 seconds
      status: TaskStatus.PENDING,
      started_at: new Date(),
      finished_at: null,
    });
  }
  await queryInterface.bulkInsert("Tasks", tasks);
}

async function down({ context: queryInterface }) {
  await queryInterface.sequelize.query(`DELETE FROM "tasks";`);
}

module.exports = { up, down };
