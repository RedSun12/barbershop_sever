'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
    }
  }
  Service.init({
    name: DataTypes.STRING,
    foto: DataTypes.STRING,
    price: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};