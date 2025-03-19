const { Router } = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const UserController = require("../controllers/user.controller");

const router = Router();

const paramsSchema = Joi.object({
    userId: Joi.number().integer().min(1).required(),
});

const bodySchema = Joi.object({
    amount: Joi.number().integer().required(),
});

router.get(
    "/:userId",
    validator.params(paramsSchema),
    UserController.getBalance,
);
router.post(
    "/:userId",
    [validator.params(paramsSchema), validator.body(bodySchema)],
    UserController.updateBalance,
);

module.exports = router;
