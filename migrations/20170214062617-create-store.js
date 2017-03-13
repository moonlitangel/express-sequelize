'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      addr: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      openTime: {
        type: Sequelize.DATE
      },
      closeTime: {
        type: Sequelize.DATE
      },
      weekendOpen: {
        type: Sequelize.DATE
      },
      weekendClose: {
        type: Sequelize.DATE
      },
      couponName: {
        type: Sequelize.STRING
      },
      couponAmount: {
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lon: {
        type: Sequelize.FLOAT
      },
      imgs: {
        type: Sequelize.STRING
      },
      imgsMenu: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('stores');
  }
};