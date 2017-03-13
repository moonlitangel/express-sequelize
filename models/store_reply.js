'use strict';

module.exports = function(sequelize, DataTypes) {
  var store_reply = sequelize.define('store_reply', {
    content: DataTypes.STRING(45),
    star: DataTypes.INTEGER(11)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        store_reply.belongsTo(models.store, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        store_reply.belongsTo(models.wd_users, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return store_reply;
};