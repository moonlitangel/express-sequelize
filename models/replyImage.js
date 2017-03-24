'use strict';

module.exports = function(sequelize, DataTypes) {
  var replyImage = sequelize.define('replyImage', {
    img: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        replyImage.belongsTo(models.store_reply, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return replyImage;
};