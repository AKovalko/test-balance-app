const UserService = require("../services/user.service");

class UserController {
    async getBalance(req, res, next) {
        try {
            const { userId } = req.params;
            const balance = await UserService.getBalance(userId);
            res.json({ balance });
        } catch (error) {
            next(error);
        }
    }
    async updateBalance(req, res, next) {
        try {
            const { userId } = req.params;
            const { amount } = req.body;

            const balance = await UserService.updateBalance(userId, amount);
            res.json({ balance });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
