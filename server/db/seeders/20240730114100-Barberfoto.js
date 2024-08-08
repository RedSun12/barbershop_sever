'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Barberfotos', [
        {
        foto: 'home1.jpg',
      },
      {
        foto: 'home22.png',
      },
      {
        foto: 'home33.png',
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Barberfotos', null, {});
  }
};
