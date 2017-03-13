'use strict';
module.exports = function(sequelize, DataTypes) {
  var store = sequelize.define('store', {
    name: DataTypes.STRING(100),
    addr: DataTypes.STRING(200),
    tel: DataTypes.STRING(11),
    category: DataTypes.STRING(45),
    openTime: DataTypes.TIME,
    closeTime: DataTypes.TIME,
    weekendOpen: DataTypes.TIME,
    weekendClose: DataTypes.TIME,
    couponName: DataTypes.STRING(45),
    couponAmount: DataTypes.INTEGER(11),
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    imgs: DataTypes.STRING(200),
    imgsMenu: DataTypes.STRING(200)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        store.hasMany(models.store_reply);
        store.hasMany(models.menu);
        store.hasMany(models.Userauth);
      }
    }
  });
  return store;
};