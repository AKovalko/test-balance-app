const User = require("../common/database/models/user.model");
const sequelize = require("../common/database/config");
const { Op } = require("sequelize");

class UserService {
  async getBalance(userId) {
    const user = await User.findByPk(Number(userId));
    if (!user) {
      throw new Error("User not found.");
    }
    return user.balance;
  }

  async updateBalance(userId, amount) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found.");

    if (amount < 0) {
      const [updatedCount] = await User.update(
        { balance: sequelize.literal(`balance + ${amount}`) },
        { where: { id: userId, balance: { [Op.gte]: Math.abs(amount) } } },
      );
      if (!updatedCount) throw new Error("Insufficient funds.");
    } else {
      await User.update(
        {
          balance: amount,
        },
        {
          id: userId,
        },
      );
    }

    const updatedUser = await User.findByPk(userId);
    return updatedUser.balance;
  }
}

module.exports = new UserService();
