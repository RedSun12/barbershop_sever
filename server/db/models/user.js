'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Product }) {
      this.hasMany(Product, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    usersurname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    avatar: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
