'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    user_login: DataTypes.STRING,
    user_nickname: DataTypes.STRING,
    user_phone: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        user.hasMany(models.store_reply);
        user.hasMany(models.like);
        user.hasMany(models.favorite);
        user.hasMany(models.reply);
      }
    }
  });
  return user;
};