const { Sequelize } = require("sequelize");
const TaskStatus = require("../../constants/task-status.constant");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("Tasks", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    intervalSeconds: {
      field: "interval_seconds",
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(15),
      default: TaskStatus.PENDING,
    },
    serverId: {
      field: "server_id",
      type: Sequelize.STRING(50),
    },
    startedAt: {
      field: "started_at",
      type: Sequelize.DATE,
      default: Sequelize.literal("NOW()"),
      allowNull: false,
    },
    finishedAt: {
      field: "finished_at",
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("Tasks");
}

module.exports = { up, down };
