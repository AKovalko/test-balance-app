const User = require("../common/database/models/user.model");
const sequelize = require("../common/database/config");
const { QueryTypes } = require("sequelize");

class UserService {
    async getBalance(userId) {
        const user = await User.findByPk(Number(userId));
        if (!user) {
            throw new Error("User not found.");
        }
        return user.balance;
    }

    async updateBalance(userId, amount) {
        const [result] = await sequelize.query(
            `UPDATE "Users" SET balance = balance + :amount WHERE id = :userId AND balance + :amount >= 0 RETURNING balance`,
            {
                replacements: {
                    amount: Number(amount),
                    userId: Number(userId),
                },
                type: QueryTypes.UPDATE,
            },
        );

        if (!result.length) throw new Error("Insufficient funds.");
        return result?.balance ?? 0;
    }
}

module.exports = new UserService();
