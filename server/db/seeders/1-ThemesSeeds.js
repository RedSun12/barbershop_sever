/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Themes',
        [
          {
            topic: 'Космос 🌠',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            topic: 'Музыкальные группы 🎶',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            topic: 'Кино 📽️',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            topic: 'Тюремные вопросы 𝄜',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            topic: 'Автомобили 🚗',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            topic: 'Эльбрус 🏔',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Themes', null, {});
    },
  };
  