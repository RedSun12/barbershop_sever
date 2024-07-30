'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ User }) {
      User.belongsTo(User, { foreignKey: 'userId' });
    }
  };
  Product.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    composition: DataTypes.TEXT,
    hairType: DataTypes.TEXT,
    size: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};