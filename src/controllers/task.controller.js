const TaskService = require("../services/task.service");

class TaskController {
  async getTask(req, res, next) {
    try {
      const task = await TaskService.findById(req.params.id);
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await TaskService.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  async startTask(req, res) {
    const { serverId } = req.body;

    try {
      const task = await TaskService.acquireTask(serverId);
      if (!task) {
        return res.status(404).json({ error: "No task available" });
      }

      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to acquire task" });
    }
  }

  async completeTask(req, res, next) {
    const { taskId } = req.params;

    try {
      const task = await TaskService.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      await TaskService.completeTask(task);
      res.status(200).json({ message: "Task completed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to complete task" });
    }
  }
}

module.exports = new TaskController();
