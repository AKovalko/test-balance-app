const { Router } = require("express");
const router = Router();

const userRouter = require("./users.route");
const taskRouter = require("./tasks.route");

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

module.exports = router;
