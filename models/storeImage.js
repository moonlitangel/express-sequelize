'use strict';

module.exports = function(sequelize, DataTypes) {
  var storeImage = sequelize.define('storeImage', {
    img: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        storeImage.belongsTo(models.store, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return storeImage;
};