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
      this.hasMany(models.user, {
        foreignKey: 'ci_number'
      });
      this.hasMany(models.transactions, {
        foreignKey: 'ci_number'
      });
    }
  };
  customer.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    ci_number: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    phone: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'customer',
  });
  return customer;
};