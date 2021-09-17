'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //**
    //* Add seed commands here.

    //* Example:
    await queryInterface.bulkInsert('customer', [
      {
        name: 'Carl',
        lastName: 'Swansong',
        email: 'swansong@email.com',
        ci_number: 1111,
        birth_date: new Date(),
        phone: 79655583,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John ',
        lastName: 'Maveric',
        email: 'maveric@email.com',
        ci_number: 2222,
        birth_date: new Date(),
        phone: 78655583,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carla',
        lastName: 'Werjstrom',
        email: 'werjstromg@email.com',
        ci_number: 333,
        birth_date: new Date(),
        phone: 79655583,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amelia ',
        lastName: 'Storm',
        email: 'storm@email.com',
        ci_number: 4444,
        birth_date: new Date(),
        phone: 78655583,
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
