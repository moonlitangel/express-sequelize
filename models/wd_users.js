'use strict';
module.exports = function(sequelize, DataTypes) {
  var wd_users = sequelize.define('wd_users', {
    user_login: DataTypes.STRING,
    user_pass: DataTypes.STRING,
    user_nickname: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_url: DataTypes.STRING,
    user_registered: DataTypes.DATE,
    user_activation_key: DataTypes.STRING,
    user_status: DataTypes.INTEGER,
    display_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        wd_users.hasMany(models.store_reply);
        wd_users.hasMany(models.Userauth);
      }
      
    }
  });
  return wd_users;
};