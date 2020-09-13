'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.CHAR,
        length : 255,
      },
      username: {
        type: Sequelize.CHAR,
        length : 20,
        unique: true,
      },
      email: {
        type: Sequelize.CHAR,
        length : 255,
        unique: true,
      },
      password: {
        type: Sequelize.CHAR,
        length : 255,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        defaultValue: 'Male',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};