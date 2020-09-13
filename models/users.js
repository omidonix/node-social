'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    validPassword(password,hash){
      return bcrypt.compareSync(password, hash)
    }

    static hashPassword(password){
      return bcrypt.hashSync(password, 8)
    }
    
  };
  users.init({
    fullname: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    username: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    gender: {
      type:DataTypes.ENUM('Male', 'Female'),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
  });
  return users;
};
