'use strict';

module.exports = function(sequelize, DataTypes) {
  var reply = sequelize.define('reply', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        reply.belongsTo(models.store_reply, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        reply.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return reply;
};