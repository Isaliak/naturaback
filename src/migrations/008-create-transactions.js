'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customer',
          key: 'id'
        }
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'company',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATE
      },
      detail: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.INTEGER
      },
      origin: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      picture: {
        type: Sequelize.STRING
      },
      bottle_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bottle_type',
          key: 'id'
        }
      },
      transaction_type: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transaction_type',
          key: 'id'
        }
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
    await queryInterface.dropTable('transactions');
  }
};