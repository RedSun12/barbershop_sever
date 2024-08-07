'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Homefotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fotoH: {
        type: Sequelize.STRING
      },
      isFeatured1: {
        type: Sequelize.BOOLEAN
      },
      isFeatured2: {
        type: Sequelize.BOOLEAN
      },
      isFeatured3: {
        type: Sequelize.BOOLEAN
      },
      isFeatured4: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Homefotos');
  }
};