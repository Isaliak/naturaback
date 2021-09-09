'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Add seed commands here.

    //  Example:
    await queryInterface.bulkInsert('roles', [{
      rolename: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      rolename: 'no-admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
