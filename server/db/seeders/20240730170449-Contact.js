'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Contacts', [
        {
          adress: 'г. Белгород ул. Победы 83б',
          telephone: '+7 920-999-99-96'
      }
    
    ], {});

  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Contacts', null, {});
  }
};
