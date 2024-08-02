'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate(models) {
    }
  }

  Basket.init(
    {
      idUser: DataTypes.INTEGER,
      idProduct: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Basket',
    }
  );
  return Basket;
};
