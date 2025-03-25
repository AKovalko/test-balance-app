const Task = require("../common/database/models/task.model");
const { Sequelize } = require("sequelize");
const TaskStatus = require("../common/constants/task-status.constant");

class TaskService {
  async findById(id) {
    return Task.findByPk(id);
  }

  async findAll() {
    return Task.findAll();
  }

  async completeTask(task) {
    task.status =
      task.intervalSeconds > 0 ? TaskStatus.PENDING : TaskStatus.COMPLETED;
    task.finishedAt = new Date();
    await task.save();
  }

  async acquireTask(serverId) {
    const task = await Task.findOne({
      where: {
        [Sequelize.Op.or]: [
          { status: TaskStatus.PENDING },
          {
            status: TaskStatus.COMPLETED,
            finishedAt: {
              [Sequelize.Op.lt]: Sequelize.literal(
                "NOW() - interval '1 second' * interval_seconds",
              ),
            },
          },
        ],
      },
      order: [
        ["finishedAt", "ASC"],
        ["id", "ASC"],
      ],
      lock: true,
      limit: 1,
    });

    if (task) {
      task.status = TaskStatus.RUNNING;
      task.serverId = serverId;
      task.startedAt = new Date();
      task.serverId = serverId;
      await task.save();
    }

    return task;
  }
}

module.exports = new TaskService();
