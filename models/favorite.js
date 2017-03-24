'use strict';

module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        favorite.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        favorite.belongsTo(models.store, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return favorite;
};