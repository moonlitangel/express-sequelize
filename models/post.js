'use strict';

module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    category: DataTypes.TEXT
    // star: DataTypes.INTEGER(11)
  }, {
    classMethods: {}
  });
  return post;
};
