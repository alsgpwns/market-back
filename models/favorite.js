const Sequelize = require('sequelize');

module.exports = class Favorite extends (
  Sequelize.Model
) {
  static init() {
    return super.init(
      {},
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Favorite',
        tableName: 'favorites',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Favorite.hasMany(db.User, { through: 'UserFavorite', foreignKey: 'userId', as: 'favoritingId' });
  }
};
