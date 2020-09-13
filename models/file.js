'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

  };
  file.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    extention: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'file',
  });
  return file;
};