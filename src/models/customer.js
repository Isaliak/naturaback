'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customer.init({
    Name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    ci_number: DataTypes.NUMERIC,
    fecha_nacimiento: DataTypes.DATE,
    phone: DataTypes.NUMERIC,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};