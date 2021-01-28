const Sequelize = require('sequelize');

module.exports = class Product extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init({
      color: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      storeName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      price: {
        type: Sequelize.NUMBER(),
        allowNull: false,
      },
    });
  }
  static associate(db) {}
};
