'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Products', [
      {
        userId: 1,
        title: 'Гель-парфюм для душа Sport Energy',
        image: 'image/image-1723135462180-976732823.png',
        manufacturer: 'Россия',
        composition: 'Ноты амбры, мускуса, ладана, фиалки, лилии, перца',
        hairType: 'Ломкие волосы',
        size: '100 мл',
        price: 1250,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Products', null, {});
  }
};
