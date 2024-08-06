'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Homefotos', [
      {
        fotoH: 'home5.png',
        isFeatured1: false,
        isFeatured2: false,
        isFeatured3: true,
        isFeatured4: false,
      },
      {
        fotoH: 'home6.png',
        isFeatured1: false,
        isFeatured2: true,
        isFeatured3: false,
        isFeatured4: false,
      },
      {
        fotoH: 'home7.png',
        isFeatured1: true,
        isFeatured2: false,
        isFeatured3: false,
        isFeatured4: false,
      },
      {
        fotoH: 'home8.png',
        isFeatured1: false,
        isFeatured2: false,
        isFeatured3: false,
        isFeatured4: true,
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Homefotos', null, {});
  }
};
