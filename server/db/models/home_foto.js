'use strict';
const {
  Model,
  BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Home_foto extends Model {
    static associate(models) {

    }
  }
  Home_foto.init({
    fotoH: DataTypes.STRING,
    isFeatured1: DataTypes.BOOLEAN,
    isFeatured2: DataTypes.BOOLEAN,
    isFeatured3: DataTypes.BOOLEAN,
    isFeatured4: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Homefoto',
  });
  return Home_foto;
};