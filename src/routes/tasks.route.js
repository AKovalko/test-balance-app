const { Router } = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const TaskController = require("../controllers/task.controller");

const router = Router();

const paramsSchema = Joi.object({
  taskId: Joi.number().integer().min(1).required(),
});

const bodySchema = Joi.object({
  serverId: Joi.number().integer().required(),
});

router.get("/", TaskController.getTasks);
router.get("/:taskId", validator.params(paramsSchema), TaskController.getTask);

router.post("/start", [validator.body(bodySchema)], TaskController.startTask);

router.post(
  "/:taskId/complete",
  [validator.params(paramsSchema), validator.body(bodySchema)],
  TaskController.completeTask,
);

module.exports = router;
