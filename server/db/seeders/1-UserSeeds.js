/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            username: 'admin',
            password: await bcrypt.hash('admin', 10),
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
  
  {
    username: 'Admin',
    email: 'admin@123',
    password: await bcrypt.hash('777', 10),
    isAdmin: true,
  },