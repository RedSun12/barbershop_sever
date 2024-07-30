/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            username: 'admin',
            password: 'admin',
            email: 'admin@admin.ru',
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      );
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Users', null, {});
    },
  };
  