'use strict';
module.exports = function(sequelize, DataTypes) {
  var Userauth = sequelize.define('Userauth', {
    auth: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Userauth.belongsTo(models.store, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Userauth.belongsTo(models.wd_users, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Userauth;
};