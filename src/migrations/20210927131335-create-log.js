'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      call: {
        type: Sequelize.STRING
      },
      functionName: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      cod_resp: {
        type: Sequelize.INTEGER
      },
      parameters: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('logs');
  }
};