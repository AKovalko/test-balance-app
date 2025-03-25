const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config");
const TaskStatus = require("../../constants/task-status.constant");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    intervalSeconds: {
      field: "interval_seconds",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(15),
      default: TaskStatus.PENDING,
    },
    serverId: {
      field: "server_id",
      type: DataTypes.STRING(50),
    },
    startedAt: {
      field: "started_at",
      type: DataTypes.DATE,
      default: Sequelize.literal("NOW()"),
      allowNull: false,
    },
    finishedAt: {
      field: "finished_at",
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Tasks",
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = Task;
