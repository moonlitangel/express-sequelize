'use strict';

module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        like.belongsTo(models.store, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        like.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return like;
};