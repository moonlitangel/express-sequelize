'use strict';
module.exports = function(sequelize, DataTypes) {
  var store = sequelize.define('store', {
    name: DataTypes.STRING(100),
    addr: DataTypes.STRING(200),
    tel: DataTypes.STRING(13),
    category: DataTypes.STRING(45),
    openTime: DataTypes.TIME,
    closeTime: DataTypes.TIME,
    weekendOpen: DataTypes.TIME,
    weekendClose: DataTypes.TIME,
    intro: DataTypes.TEXT, 
    couponName: DataTypes.STRING(45),
    couponAmount: DataTypes.INTEGER(11),
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    likeCount: DataTypes.INTEGER,
    replyCount: DataTypes.INTEGER,
    imgsMenu: DataTypes.STRING(200)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        store.hasMany(models.store_reply);
        store.hasMany(models.storeImage);
        store.hasMany(models.menu);
        store.hasMany(models.tag);
        store.hasMany(models.like);
        store.hasMany(models.favorite);
      }
    }
  });
  return store;
};