'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references: {
          model: {
              tableName: "users",
          },
          key: "id"
        },
      },
      file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
              tableName: "files",
          },
          key: "id"
        },
        allowNull : true
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull : false
      },
      tags: {
        type: Sequelize.STRING
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : false
      },
      comment_count: {
        type: Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : false
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : false
      },
      dislike_count: {
        type: Sequelize.INTEGER,
        defaultValue : 0,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};