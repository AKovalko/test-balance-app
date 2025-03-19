const { Router } = require("express");
const router = Router();

const userRouter = require("./users.route");

router.use("/users", userRouter);

module.exports = router;
