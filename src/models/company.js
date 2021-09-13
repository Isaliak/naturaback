'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  company.init({
    name: DataTypes.STRING,
    addres: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    logo: DataTypes.STRING,
    web: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    state: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'company',
  });
  return company;
};