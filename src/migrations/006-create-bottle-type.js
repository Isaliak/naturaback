'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bottle_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.NUMERIC
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      state: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bottle_type');
  }
};