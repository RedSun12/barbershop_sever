'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsToMany(User, {
        through: 'Baskets',
        foreignKey: 'idProduct',
      });
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
    price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
