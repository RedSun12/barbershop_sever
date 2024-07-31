'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Services',
      [
        {
          name: 'Мужская стрижка',
          foto: '1сервис.png',
          price: 900,
          comment: false,
        },
        {
          name: 'Стрижка машинкой',
          foto: '2сервис.png',
          price: 500,
          comment: 'Коммент',
        },
        {
          name: 'Студенческая стрижка',
          foto: '3сервис.png',
          price: 700,
          comment: 'Коммент',
        },
        {
          name: 'Оформление бороды',
          foto: '4сервис.png',
          price: 700,
          comment: 'Коммент',
        },
        {
          name: 'Оконтовка бороды',
          foto: '5сервис.png',
          price: 400,
          comment: 'Коммент',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};
